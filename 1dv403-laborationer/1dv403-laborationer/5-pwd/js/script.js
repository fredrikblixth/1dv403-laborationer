"use strict";

if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

var Desktop = function () {
    var self = this;
    var memoryButton = document.querySelector("#memoryButton");

    self.init = function () {
        document.body.addEventListener('dragover', self.dragOver, false);
        memoryButton.addEventListener("click", self.openMemory, false);
    };

    self.openMemory = function () {
        var modal = new Modal("memory");
        var memoryBoard = new MemoryBoard(4, 4, 1);
        var memoryDiv = memoryBoard.init();
        modal.renderModal("Memory", memoryDiv);
        self.init();
    };

    self.dragOver = function (event) {
        event.preventDefault();
        return false;
    };
};

var desktop = new Desktop();
window.onload = desktop.init();