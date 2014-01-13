"use strict";

if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

var Desktop = function () {
    var self = this;
    var memoryButton = document.querySelector("#memoryButton");
    var newsButton = document.querySelector("#newsButton");
    var chatButton = document.querySelector("#chatButton");
    var pictureButton = document.querySelector("#pictureButton");

    self.init = function () {
        document.body.addEventListener('dragover', self.dragOver, false);
        memoryButton.addEventListener("click", self.openMemory, false);
        newsButton.addEventListener("click", self.openRss, false);
        chatButton.addEventListener("click", self.openChat, false);
        pictureButton.addEventListener("click", self.openPictureGallery, false);
    };

    self.openMemory = function () {
        var modal = new Modal("memory");
        var memoryBoard = new MemoryBoard(4, 4, 1);
        var memoryDiv = memoryBoard.init();
        modal.setSize(485, 210);
        modal.renderContent(memoryDiv);
        
    };

    self.openRss = function () {
        var rssUrl = "http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url=" + escape("http://www.dn.se/m/rss/senaste-nytt");
        var modal = new Modal("news");
        var ajaxCon = new AjaxCon(rssUrl, modal.renderContent);
    };

    self.openPictureGallery = function () {
        var picGallery = new PictureGallery();
        var pictureDiv = picGallery.getPictureDiv();
        var modal = new Modal("pictures");
        modal.renderContent(pictureDiv);
    };

    self.openChat = function () {
        var chatUrl = "";
        var modal = new Modal("chat");
        var ajaxCon = new AjaxCon(chatUrl, modal.renderContent);
    };

    self.dragOver = function (event) {
        event.preventDefault();
        return false;
    };
};

var desktop = new Desktop();
window.onload = desktop.init();