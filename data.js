const mysql =  require('mysql2/promise')
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {createDB} = require("mysql-memory-server");
const fs = require('fs');
const path = require('path');

function extendPool(pool) { // pretend that mysql2/promise works like mysql-await
    pool.awaitQuery = async function(query, params) {
        const [rows] = await pool.query(query, params);
        return rows;
    };
    return pool;
}

let db, connPool;

/**
 * Setup the database
 * @returns {Promise<void>}
 */
async function setup(){
    db = await createDB();
    connPool = await mysql.createPool({
        connectionLimit: 10,
        host: '127.0.0.1',
        user: db.username,
        port: db.port,
        database: db.dbName,
        password: db.password
    });

    connPool = extendPool(connPool);

    try {
        // Read schema file
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schemaSQL = fs.readFileSync(schemaPath, 'utf8');

        // Split the schema into individual statements
        const statements = schemaSQL.split(';').filter(stmt => stmt.trim());

        // Execute each statement
        for (const statement of statements) {
            if (statement.trim()) {
                await connPool.query(statement);
            }
        }
        console.log("Database schema created successfully");
    } catch (error) {
        console.error("Error setting up database schema:", error);
        throw error;
    }
}


/**
 * try login
 * @param username
 * @param password
 * @returns return account_id or false if failed
 */
async function login(username, password) {
    let result = await connPool.awaitQuery("SELECT * FROM ACCOUNT WHERE USERNAME = ?", username);
    if (result.length === 0) {
        return false;
    }
    let hash = result[0].PASSWORD_HASH;
    // console.log("Username: " + username + " Password: " + password + " Hash: " + hash);
    if (await bcrypt.compare(password, hash)) {
        return result[0].ACCOUNT_ID;
    }
    else {
        return false;
    }
}

/**
 * Try signup
 * @param username
 * @param password
 * @returns return sql ID if success, otherwise false
 */
async function signup(username, password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt); // generate hash
    // console.log("Username: " + username + " Password: " + password + " Hash: " + hash);
    try {
        let result = await connPool.awaitQuery("INSERT INTO ACCOUNT (USERNAME, PASSWORD_HASH) VALUES (?, ?)", [username, hash]);

        if (result.affectedRows === 0) {
            console.log("Failed to insert");
            return false;
        }
        return result.insertId;
    } catch (e) {
        console.log(e);
        return false;
    }
}

/**
 * Generate a token from a ID
 * @param ID
 * @returns string token
 */
async function generateToken(ID) {
    var privateKey = "wowwiezowwie";
    var token = await jwt.sign({
        "ID": ID,
    }, privateKey, {expiresIn: '1h'});
    console.log("Generated token", token);
    return token;
}

/**
 * Check if a token is valid and decode it to the ID
 * @param token token to decode
 * @returns decode to ID or false if fail
 */
async function checkToken(token) {
    var privateKey = "wowwiezowwie";
    try {
        var decoded = await jwt.verify(token, privateKey);
    } catch (e) {
        console.log(e);
        return false;
    }
    return decoded.ID;
}

/**
 * Get all tasks for a user, can select filter also, set whichever filter you want to true
 * @param ID
 * @param done set 1 of these to true or none to not filter
 * @param starred set 1 of these to true or none to not filter
 * @param deleted set 1 of these to true or none to not filter
 * @returns tasks dict or false if failed
 */
async function getTasks(ID, done = false, starred = false, deleted = false) {
    let query;
    let parameters = [ID];
    if (done) {
        query = "SELECT * FROM NOTE WHERE ACCOUNT_ID = ? AND DONE = TRUE";
    }
    else if (starred) {
        query = "SELECT * FROM NOTE WHERE ACCOUNT_ID = ? AND STARRED = TRUE";
    }
    else if (deleted) {
        query = "SELECT * FROM NOTE WHERE ACCOUNT_ID = ? AND DELETED = TRUE";
    }
    else {
        query = "SELECT * FROM NOTE WHERE ACCOUNT_ID = ?"; // all
    }
    let result = await connPool.awaitQuery(query, parameters);
    if (result.length === 0) {
        return false;
    }
    return result;
}

/**
 * Get a specific task
 * @param account_id
 * @param task_id task_id
 * @returns {Promise<*|boolean>} task dict if work else false
 */
async function getTask(account_id, task_id) {
    try {
        let result = await connPool.awaitQuery("SELECT * FROM NOTE WHERE ACCOUNT_ID = ? AND NOTE_ID = ?", [account_id, task_id]);

        if (result.length === 0) {
            return false
        }
        return result;
    } catch (e) {
        console.log(e);
        return false;
    }
}

/**
 * Updates a boolean on any note entry
 * @param account_id
 * @param task_id
 * @param type DONE, STARRED, DELETED
 * @param value true, false
 * @returns {Promise<boolean>}
 */
async function updateBool(account_id, task_id, type, value) {
    if (!(["DONE", "STARRED", "DELETED"].includes(type))) {  // i did these checks in update also but figured for safety I would put them here aswell
        return false
    }
    if (typeof value !== "boolean") {
        return false;
    }
    let query = `UPDATE NOTE
                 SET ${type} = ?
                 WHERE ACCOUNT_ID = ?
                   AND NOTE_ID = ?`;
    // i believe this type is safe because it can only be 3 things

    let parameters = [value, account_id, task_id];
    try {
        let result = await connPool.awaitQuery(query, parameters);
        if (result.affectedRows === 0) {
            return false
        }
        return true
    } catch (e) {
        console.log(e);
        return false;
    }
}

/**
 * Create a task
 * @param title
 * @param content
 * @param account_id
 * @returns {Promise<number|boolean>} insert id if worked, else false
 */
async function createTask(title, content, account_id) {
    try {
        let date = new Date().toISOString().slice(0, 19).replace('T', ' ').split(' ');


        let query = `INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DONE, STARRED, DELETED, ACCOUNT_ID)
                     VALUES (?, ?, Timestamp("${date[0]}", "${date[1]}"), ?, ?, ?, ?)`;
        let parameters = [title, content, false, false, false, account_id];
        let result = await connPool.awaitQuery(query, parameters);

        if (result.affectedRows === 0) {
            return false;
        }
        return result.insertId;
    } catch (e) {
        console.log(e);
        return false;
    }
}

/**
 * Delete a specific task
 * @param task_id
 * @param account_id
 * @returns {Promise<boolean>} false if failed, true if succeeded
 */
async function deleteTask(task_id, account_id) {
    try {
        await connPool.awaitQuery("DELETE FROM COMMENT WHERE ACCOUNT_ID = ? AND NOTE_ID = ?", [account_id, task_id]);
        let result = await connPool.awaitQuery("DELETE FROM NOTE WHERE ACCOUNT_ID = ? AND NOTE_ID = ?", [account_id, task_id]);

        if (result.affectedRows === 0) {
            return false;
        }
        return true
    } catch (e) {
        console.log(e);
        return false;
    }
}

/**
 * Edit a task
 * @param task_id
 * @param account_id
 * @param title new title
 * @param Content new content
 * @returns {Promise<boolean>} true if succeeded, false otherwise
 */
async function editTask(task_id, account_id, title, Content) {
    try {
        let query = "UPDATE NOTE SET TITLE = ?, CONTENT = ? WHERE ACCOUNT_ID = ? AND NOTE_ID = ?";
        let parameters = [title, Content, account_id, task_id];
        let result = await connPool.awaitQuery(query, parameters);
        if (result.affectedRows === 0) {
            return false;
        }
        return true
    } catch (e) {
        console.log(e);
        return false;
    }
}

/**
 * Get comments on a specific task
 * @param task_id
 * @param account_id
 * @returns {Promise<*|boolean>} returns dict comments if worked, else false
 */
async function getComments(task_id, account_id) {
    try {
        let query = "SELECT * FROM COMMENT WHERE ACCOUNT_ID = ? AND NOTE_ID = ?";
        let parameters = [account_id, task_id];
        let result = await connPool.awaitQuery(query, parameters);

        if (result.length === 0) {
            return false;
        }
        return result
    } catch (e) {
        console.log(e);
        return false;
    }
}

/**
 * Create a comment on a task
 * @param task_id
 * @param account_id
 * @param content content of the comment
 * @returns {Promise<number|boolean>} if worked returns insert id, else false
 */
async function createComment(task_id, account_id, content) {
    try {
        let query = "INSERT INTO COMMENT (COMMENT_CONTENT, NOTE_ID, ACCOUNT_ID) VALUES (?, ?, ?) ";
        let parameters = [content, task_id, account_id];
        let result = await connPool.awaitQuery(query, parameters);

        if (result.affectedRows === 0) {
            return false;
        }
        return result.insertId;
    } catch (e) {
        console.log(e);
        return false;
    }
}

/**
 * Delete a comment on a task
 * @param comment_id
 * @param task_id
 * @param account_id
 * @returns {Promise<boolean>} true if worked, else false
 */
async function deleteComment(comment_id, task_id, account_id) {
    try {
        let query = "DELETE FROM COMMENT WHERE COMMENT_ID = ? AND ACCOUNT_ID = ? AND NOTE_ID = ? ";
        let parameters = [comment_id, account_id, task_id];
        let result = await connPool.awaitQuery(query, parameters);
        if (result.affectedRows === 0) {
            return false;
        }
        return true
    } catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = {
    setup,
    login,
    signup,
    generateToken,
    checkToken,
    getTasks,
    getTask,
    updateBool,
    createTask,
    deleteTask,
    editTask,
    getComments,
    createComment,
    deleteComment
};