"use strict";

if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

var Desktop = function () {
    var self = this;
    var memoryButton = document.querySelector("#memoryButton");
    var newsButton = document.querySelector("#newsButton");

    self.init = function () {
        document.body.addEventListener('dragover', self.dragOver, false);
        memoryButton.addEventListener("click", self.openMemory, false);
        newsButton.addEventListener("click", self.openRss, false);
    };

    self.openMemory = function () {
        var modal = new Modal("memory");
        var memoryBoard = new MemoryBoard(4, 4, 1);
        var memoryDiv = memoryBoard.init();
        modal.renderModal("Memory", memoryDiv);
        self.init();
    };

    self.openRss = function () {
        var rofl = new RssReader();
        var modal = new Modal("news");
        var div = rofl.getRssHTML();
        modal.renderModal("RSS", div);
    };

    self.dragOver = function (event) {
        event.preventDefault();
        return false;
    };
};

var desktop = new Desktop();
window.onload = desktop.init();