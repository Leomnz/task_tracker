CREATE TABLE ACCOUNT
(
    ACCOUNT_ID    INT PRIMARY KEY AUTO_INCREMENT,
    USERNAME      VARCHAR(50) NOT NULL UNIQUE,
    PASSWORD_HASH VARCHAR(60) NOT NULL
);

CREATE TABLE NOTE
(
    NOTE_ID       INT PRIMARY KEY AUTO_INCREMENT,
    TITLE         TINYTEXT NOT NULL,
    CONTENT       TEXT     NOT NULL,
    CREATION_TIME TIMESTAMP,
    DEADLINE      TIMESTAMP,
    DONE          BOOLEAN  NOT NULL,
    STARRED       BOOLEAN  NOT NULL,
    DELETED       BOOLEAN  NOT NULL,
    ACCOUNT_ID    INT      NOT NULL,
    FOREIGN KEY (ACCOUNT_ID) REFERENCES ACCOUNT (ACCOUNT_ID)
);

CREATE TABLE COMMENT
(
    COMMENT_ID      INT PRIMARY KEY AUTO_INCREMENT,
    COMMENT_CONTENT TEXT,
    NOTE_ID         INT NOT NULL,
    ACCOUNT_ID      INT NOT NULL,
    FOREIGN KEY (ACCOUNT_ID) REFERENCES ACCOUNT (ACCOUNT_ID),
    FOREIGN KEY (NOTE_ID) REFERENCES NOTE (NOTE_ID)
);


# admin, admin, id:1
# user, example, id:2

INSERT INTO ACCOUNT (USERNAME, PASSWORD_HASH)
VALUES ("admin", "$2a$10$apW/oomYBNNNdLYVmkpG4eMFfTCILxWJvCVUBjlD3awNWF8KPtifa");
INSERT INTO ACCOUNT (USERNAME, PASSWORD_HASH)
VALUES ("user", "$2a$10$bjHXkgYe.WgNTz0HVvy2RuJtp9I6VHYYQ5fQa9TSPUaPKNYpR6pvi");

INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Plan and Prepare Weekly Meals",
        "Step 1: Open the drawer and find things you didn’t know you owned. Step 2: Dump everything onto the counter in absolute chaos. Step 3: Decide you need half the junk 'just in case.' Step 4: Arrange items back in a barely logical way. Step 5: Pat yourself on the back knowing it'll be messy again tomorrow.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-18", "02:42:00"), True, False, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Replace Light Bulbs as Needed",
        "Step 1: Separate clothes into categories that make no sense. Step 2: Forget to check pockets and throw everything in the machine. Step 3: Set the washer, ignore the instructions, and hope for the best. Step 4: Move clothes to the dryer five hours later. Step 5: Stare at the clean pile for three days instead of folding it.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-20", "05:42:00"), False, False, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Take Out the Trash and Recycling", "Step 1: Glare at the overflowing trash can and pretend it’s not there.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-18", "08:42:00"), False, False, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Sort and Fold Laundry",
        "Step 1: Open the drawer and find things you didn’t know you owned. Step 2: Dump everything onto the counter in absolute chaos. Step 3: Decide you need half the junk 'just in case.' Step 4: Arrange items back in a barely logical way. Step 5: Pat yourself on the back knowing it'll be messy again tomorrow.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-14", "18:42:00"), False, False, True, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Vacuum and Mop All Floors",
        "Step 1: Fill a bucket with soapy water like you’re about to host a car wash. Step 2: Spray yourself with the hose accidentally. Step 3: Scrub like you’re determined to erase every bug splatter. Step 4: Rinse and realize there are still streaks everywhere. Step 5: Drive it, only to get splashed by mud on the way home.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-21", "05:42:00"), True, False, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Take Out the Trash and Recycling",
        "Step 1: Stand in the room and ask yourself why you own so much stuff. Step 2: Create piles like ‘keep’, ‘donate’, and ‘what even is this?’ Step 3: Regret decisions and put 90% back where it was. Step 4: Stash the ‘maybe’ pile in a closet for future-you to deal with. Step 5: Proclaim the room decluttered and reward yourself with coffee.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-18", "12:42:00"), False, False, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Vacuum and Mop All Floors",
        "Step 1: Separate clothes into categories that make no sense. Step 2: Forget to check pockets and throw everything in the machine. Step 3: Set the washer, ignore the instructions, and hope for the best. Step 4: Move clothes to the dryer five hours later. Step 5: Stare at the clean pile for three days instead of folding it.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-19", "18:42:00"), False, True, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Fix Leaky Faucets or Minor Repairs",
        "Step 1: Grab a duster and wonder where all this dust even comes from. Step 2: Wave it around like you're casting a spell. Step 3: Knock over three items and catch one mid-air like a ninja. Step 4: Spend 10 minutes cleaning one spot and ignore the rest. Step 5: Admire your barely noticeable efforts and call it a day.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-15", "20:42:00"), False, True, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Clean the Refrigerator and Dispose of Expired Items",
        "Step 1: Open the fridge and instantly regret your life choices. Step 2: Pull out items and engage in a sniff-test showdown. Step 3: Discover something unrecognizable in the back and question science. Step 4: Scrub the shelves like you're polishing a diamond. Step 5: Rearrange food you don't plan to eat and reward yourself with a snack",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-20", "18:42:00"), False, False, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Take Out the Trash and Recycling",
        "Step 1: Separate clothes into categories that make no sense. Step 3: Set the washer, ignore the instructions, and hope for the best. Step 4: Move clothes to the dryer five hours later. Step 5: Stare at the clean pile for three days instead of folding it.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-19", "18:42:00"), False, False, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Sweep and Clean the Porch or Balcony",
        "Step 1: Open the drawer and find things you didn’t know you owned. Step 2: Dump everything onto the counter in absolute chaos. Step 3: Decide you need half the junk 'just in case.' Step 4: Arrange items back in a barely logical way. Step 5: Pat yourself on the back knowing it'll be messy again tomorrow.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-16", "12:42:00"), False, False, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Clean the Refrigerator and Dispose of Expired Items",
        "Step 1: Glare at the overflowing trash can and pretend it’s not there. Step 2: Grab the bag, mumbling about how no one else does this. Step 3: Sprint to the garbage can outside like it's the Olympics. Step 4: Miss the trash can with your toss and regret nothing. Step 5: Go back inside and vow to never do it again (you'll do it tomorrow).",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-19", "16:42:00"), False, False, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Change Bed Linens and Pillow Covers",
        "Step 1: Stand in the room and ask yourself why you own so much stuff. Step 2: Create piles like ‘keep’, ‘donate’, and ‘what even is this?’ Step 3: Regret decisions and put 90% back where it was. Step 4: Stash the ‘maybe’ pile in a closet for future-you to deal with. Step 5: Proclaim the room decluttered and reward yourself with coffee.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-21", "05:42:00"), False, False, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Organize Bookshelves by Category", "", Timestamp("2024-12-13", "19:42:00"),
        Timestamp("2024-12-14", "12:42:00"), False, False, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Clean the Refrigerator and Dispose of Expired Items",
        "Step 1: Stand at the side of your bed and sigh deeply. Step 2: Grab the blanket and give it a dramatic fluff. Step 3: Tuck the sheets in like you're folding a burrito. Step 4: Add pillows in a way that looks great but is terrible to sleep on. Step 5: Admire your work for 10 seconds before ruining it again tonight.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-19", "14:42:00"), False, False, True, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Clean the Refrigerator and Dispose of Expired Items",
        "Step 1: Pull everything out and instantly regret your choice. Step 2: Try on clothes you haven’t worn since high school. Step 3: Create neat piles and then accidentally mix them up. Step 4: Keep way more items than you intended. Step 5: Close the closet door quickly before it all falls back out.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-14", "13:42:00"), False, False, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Plan and Prepare Weekly Meals",
        "Step 1: Open the fridge and instantly regret your life choices. Step 2: Pull out items and engage in a sniff-test showdown. Step 3: Discover something unrecognizable in the back and question science. Step 4: Scrub the shelves like you're polishing a diamond. Step 5: Rearrange food you don't plan to eat and reward yourself with a snack",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-17", "00:42:00"), False, False, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Deep Clean the Bathroom and Scrub Tiles",
        "Step 1: Fill a bucket with soapy water like you’re about to host a car wash. Step 2: Spray yourself with the hose accidentally. Step 3: Scrub like you’re determined to erase every bug splatter. Step 4: Rinse and realize there are still streaks everywhere. Step 5: Drive it, only to get splashed by mud on the way home.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-17", "07:42:00"), False, False, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Clean and Organize the Garage",
        "Step 1: Open the drawer and find things you didn’t know you owned. Step 2: Dump everything onto the counter in absolute chaos. Step 3: Decide you need half the junk 'just in case.' Step 4: Arrange items back in a barely logical way. Step 5: Pat yourself on the back knowing it'll be messy again tomorrow.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-15", "16:42:00"), False, False, True, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Replace Light Bulbs as Needed",
        "Step 1: Plug in the vacuum and realize you're out of outlets. Step 2: Battle with the cord like it's an angry snake. Step 3: Run the vacuum over the same crumb 27 times. Step 4: Vacuum up something valuable and pretend it never happened. Step 5: Admire the carpet and immediately spill something on it.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-14", "19:42:00"), False, False, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Dust and Polish Furniture in the Living Room",
        "Step 1: Stand at the side of your bed and sigh deeply. Step 2: Grab the blanket and give it a dramatic fluff. Step 3: Tuck the sheets in like you're folding a burrito. Step 4: Add pillows in a way that looks great but is terrible to sleep on. Step 5: Admire your work for 10 seconds before ruining it again tonight.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-14", "11:42:00"), False, False, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Reorganize Pantry Shelves",
        "Step 1: Fill a bucket with soapy water like you’re about to host a car wash. Step 2: Spray yourself with the hose accidentally. Step 3: Scrub like you’re determined to erase every bug splatter. Step 4: Rinse and realize there are still streaks everywhere. Step 5: Drive it, only to get splashed by mud on the way home.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-17", "11:42:00"), False, False, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Plan and Prepare Weekly Meals",
        "Step 1: Open the drawer and find things you didn’t know you owned. Step 2: Dump everything onto the counter in absolute chaos. Step 3: Decide you need half the junk 'just in case.' Step 4: Arrange items back in a barely logical way. Step 5: Pat yourself on the back knowing it'll be messy again tomorrow.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-18", "13:42:00"), False, False, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Dust and Polish Furniture in the Living Room",
        "Step 1: Stand in the room and ask yourself why you own so much stuff. Step 2: Create piles like ‘keep’, ‘donate’, and ‘what even is this?’ Step 3: Regret decisions and put 90% back where it was. Step 4: Stash the ‘maybe’ pile in a closet for future-you to deal with. Step 5: Proclaim the room decluttered and reward yourself with coffee.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-14", "05:42:00"), False, False, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Change Bed Linens and Pillow Covers",
        "Step 1: Plug in the vacuum and realize you're out of outlets. Step 2: Battle with the cord like it's an angry snake. Step 3: Run the vacuum over the same crumb 27 times. Step 4: Vacuum up something valuable and pretend it never happened. Step 5: Admire the carpet and immediately spill something on it.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-21", "05:42:00"), False, False, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Dust and Polish Furniture in the Living Room",
        "Step 1: Open the drawer and find things you didn’t know you owned. Step 2: Dump everything onto the counter in absolute chaos. Step 3: Decide you need half the junk 'just in case.' Step 4: Arrange items back in a barely logical way. Step 5: Pat yourself on the back knowing it'll be messy again tomorrow.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-21", "16:42:00"), True, False, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Take Out the Trash and Recycling",
        "Step 1: Plug in the vacuum and realize you're out of outlets. Step 2: Battle with the cord like it's an angry snake. Step 3: Run the vacuum over the same crumb 27 times. Step 4: Vacuum up something valuable and pretend it never happened. Step 5: Admire the carpet and immediately spill something on it.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-17", "05:42:00"), False, False, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Change Bed Linens and Pillow Covers",
        "Step 1: Separate clothes into categories that make no sense. Step 2: Forget to check pockets and throw everything in the machine. Step 3: Set the washer, ignore the instructions, and hope for the best. Step 4: Move clothes to the dryer five hours later. Step 5: Stare at the clean pile for three days instead of folding it.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-15", "17:42:00"), False, False, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Clean and Organize the Garage",
        "Step 1: Grab a duster and wonder where all this dust even comes from. Step 2: Wave it around like you're casting a spell. Step 3: Knock over three items and catch one mid-air like a ninja. Step 4: Spend 10 minutes cleaning one spot and ignore the rest. Step 5: Admire your barely noticeable efforts and call it a day.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-18", "13:42:00"), False, False, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Sweep and Clean the Porch or Balcony",
        "Step 1: Pull everything out and instantly regret your choice. Step 2: Try on clothes you haven’t worn since high school. Step 3: Create neat piles and then accidentally mix them up. Step 4: Keep way more items than you intended. Step 5: Close the closet door quickly before it all falls back out.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-15", "22:42:00"), False, False, False, 1);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Vacuum and Mop All Floors",
        "Step 1: Open the drawer and find things you didn’t know you owned. Step 2: Dump everything onto the counter in absolute chaos. Step 3: Decide you need half the junk 'just in case.' Step 4: Arrange items back in a barely logical way. Step 5: Pat yourself on the back knowing it'll be messy again tomorrow.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-14", "21:42:00"), False, False, False, 2);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Clean and Organize the Kitchen Cabinets",
        "Step 1: Separate clothes into categories that make no sense. Step 2: Forget to check pockets and throw everything in the machine. Step 3: Set the washer, ignore the instructions, and hope for the best. Step 4: Move clothes to the dryer five hours later. Step 5: Stare at the clean pile for three days instead of folding it.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-16", "04:42:00"), False, False, False, 2);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Sort and Fold Laundry",
        "Step 1: Stand in the room and ask yourself why you own so much stuff. Step 2: Create piles like ‘keep’, ‘donate’, and ‘what even is this?’ Step 3: Regret decisions and put 90% back where it was. Step 4: Stash the ‘maybe’ pile in a closet for future-you to deal with. Step 5: Proclaim the room decluttered and reward yourself with coffee.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-18", "13:42:00"), False, False, False, 2);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Plan and Prepare Weekly Meals",
        "Step 1: Grab a duster and wonder where all this dust even comes from. Step 2: Wave it around like you're casting a spell. Step 3: Knock over three items and catch one mid-air like a ninja. Step 4: Spend 10 minutes cleaning one spot and ignore the rest. Step 5: Admire your barely noticeable efforts and call it a day.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-13", "19:42:00"), False, False, False, 2);
INSERT INTO NOTE (TITLE, CONTENT, CREATION_TIME, DEADLINE, DONE, STARRED, DELETED, ACCOUNT_ID)
VALUES ("Take Out the Trash and Recycling",
        "Step 1: Separate clothes into categories that make no sense. Step 2: Forget to check pockets and throw everything in the machine. Step 3: Set the washer, ignore the instructions, and hope for the best. Step 4: Move clothes to the dryer five hours later. Step 5: Stare at the clean pile for three days instead of folding it.",
        Timestamp("2024-12-13", "19:42:00"), Timestamp("2024-12-20", "02:42:00"), False, False, False, 2);

