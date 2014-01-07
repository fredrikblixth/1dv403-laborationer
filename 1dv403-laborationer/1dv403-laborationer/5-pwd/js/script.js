"use strict";

if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

var Desktop = function () {
    var self = this;
    var moveThis;

    self.init = function () {
        var modal = new Modal();
        var memoryBoard = new MemoryBoard(4, 4, 1);
        var memoryDiv = memoryBoard.init();
        modal.renderModal("Memory", memoryDiv);

        var modal2 = new Modal();
        var memoryBoard2 = new MemoryBoard(4, 4, 1);
        var memoryDiv2 = memoryBoard2.init();
        modal2.renderModal("Memory", memoryDiv2);

        var windows = document.querySelectorAll(".window");
        windows.forEach(function (window) {
            window.addEventListener("dragstart", self.dragStart, false);
        });

        document.body.addEventListener('dragover', self.dragOver, false);
        document.body.addEventListener("drop", self.drop, false);
    };

    self.dragOver = function (event) {
        event.preventDefault();
        return false;
    };

    self.drop = function (event) {
        console.log("drop");
        var offset = event.dataTransfer.getData("text/plain").split(',');
        var dm = moveThis;
        dm.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
        dm.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
        event.preventDefault();
        return false;
    };

    self.dragStart = function (event) {
        console.log("start");
        moveThis = event.srcElement;
        var style = window.getComputedStyle(event.target, null);
        event.dataTransfer.setData("text/plain",
        (parseInt(style.getPropertyValue("left"), 10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY));
    };
};

var desktop = new Desktop();
desktop.init();