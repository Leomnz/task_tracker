// Code for grid arrange in masonry pattern
// all of this is from here https://medium.com/@andybarefoot/a-masonry-style-layout-using-css-grid-8c663d355ebb
function resizeGridItem(item) {
    grid = document.getElementsByClassName("grid")[0];
    rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    rowSpan = Math.ceil((item.querySelector('.inner_task').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = "span " + rowSpan;
}

function resizeAllGridItems() {
    // console.log("resizing")
    allItems = document.getElementsByClassName("task");
    for (x = 0; x < allItems.length; x++) {
        resizeGridItem(allItems[x]);
    }
}

window.addEventListener("resize", resizeAllGridItems);
window.addEventListener("load", resizeAllGridItems);
