"use strict";

if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

var Modal = function () {
    var self = this;
    var modalDiv = document.createElement("div");
    modalDiv.setAttribute("class", "window inactive");
    modalDiv.setAttribute("draggable", "true");

    var captionDiv = document.createElement("div");
    captionDiv.setAttribute("class", "caption");

    var iconSpan = document.createElement("span");
    iconSpan.setAttribute("class", "icon icon-windows");

    var windowTitle = document.createElement("div");
    windowTitle.setAttribute("class", "title");

    var closeButton = document.createElement("a");
    closeButton.setAttribute("class", "btn-close");

    var contentDiv = document.createElement("div");
    contentDiv.setAttribute("class", "content");

    captionDiv.appendChild(iconSpan);
    captionDiv.appendChild(windowTitle);
    captionDiv.appendChild(closeButton);

    modalDiv.appendChild(captionDiv);
    modalDiv.appendChild(contentDiv);
    

    self.addEvents = function () {
        closeButton.addEventListener("click", self.closeModal, false);
    };

    self.closeModal = function (e) {
        var captionDiv = e.srcElement.parentNode;
        var modal = captionDiv.parentNode;
        modal.parentNode.removeChild(modal);
    };

    self.minimizeModal = function (e) {

    };

    self.resizeModal = function (e) {

    };

    self.renderModal = function (title, content) {
        windowTitle.textContent = title;
        contentDiv.appendChild(content);

        var metro = document.querySelector(".metro");
        metro.insertBefore(modalDiv, metro.firstChild);
        self.addEvents();
    };
};