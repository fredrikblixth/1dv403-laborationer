"use strict";

var Modal = function (app) {
    var self = this;
    self.isDragging = false;
    self.modalDiv = document.createElement("div");
    self.modalDiv.setAttribute("class", "window");
    self.modalDiv.setAttribute("draggable", "true");
    self.modalDiv.style.zIndex = 1000;

    var captionDiv = document.createElement("div");
    captionDiv.setAttribute("class", "caption");

    var iconSpan = document.createElement("span");

    self.renderTitle = function (title) {
        windowTitle.textContent = title;
    }

    var windowTitle = document.createElement("div");
    windowTitle.setAttribute("class", "title");

    var closeButton = document.createElement("a");
    closeButton.setAttribute("class", "btn-close");

    var contentDiv = document.createElement("div");
    contentDiv.setAttribute("class", "content");

    captionDiv.appendChild(iconSpan);
    captionDiv.appendChild(windowTitle);
    captionDiv.appendChild(closeButton);

    self.modalDiv.appendChild(captionDiv);
    self.modalDiv.appendChild(contentDiv);

    switch (app) {
        case "memory":
            iconSpan.setAttribute("class", "icon icon-android");
            self.renderTitle("Memory");
            break;
        case "pictures":
            iconSpan.setAttribute("class", "icon icon-pictures");
            self.renderTitle("Bildgalleri");
            break;
        case "picture":
            iconSpan.setAttribute("class", "icon icon-pictures");
            self.renderTitle("Bild");
            break;
        case "chat":
            iconSpan.setAttribute("class", "icon icon-comments");
            self.renderTitle("Chat");
            break;
        case "news":
            iconSpan.setAttribute("class", "icon icon-newspaper");
            self.renderTitle("Nyheter");
            break;
    };

    self.addEvents = function () {
        self.modalDiv.addEventListener("dragstart", self.dragStart, false);
        closeButton.addEventListener("click", self.closeModal, false);
        self.modalDiv.addEventListener("click", self.setActive, false);
        document.body.addEventListener("drop", self.drop, false);
    };

    self.closeModal = function (e) {
        var captionDiv = e.srcElement.parentNode;
        var modal = captionDiv.parentNode;
        modal.parentNode.removeChild(modal);
    };

    self.setSize = function (width, height) {
        self.modalDiv.style.width = (width + 15) + "px";
        self.modalDiv.style.height = (height + 40) + "px";
        contentDiv.style.width = width + "px";
        contentDiv.style.height = height + "px";
    };

    self.renderContent = function (content) {
        if (typeof (content) === "object") {
            contentDiv.appendChild(content);
        }
        else {
            contentDiv.innerHTML = content;
        }

        var modals = document.querySelectorAll(".window");
        modals.forEach(function (modal) {
            modal.setAttribute("class", "window inactive");
            modal.style.zIndex = 0;
        });

        var metro = document.querySelector(".metro");
        metro.insertBefore(self.modalDiv, metro.firstChild);
        self.addEvents();
    };

    self.setActive = function (e) {
        var modals = document.querySelectorAll(".window");
        modals.forEach(function (modal) {
            modal.setAttribute("class", "window inactive");
            modal.style.zIndex = 0;
        });
        self.modalDiv.setAttribute("class", "window");
        self.modalDiv.style.zIndex = 1000;
    };

    self.drop = function (event) {
        if (self.isDragging) {
            var offset = event.dataTransfer.getData("Text").split(',');
            var desktop = document.querySelector(".metro");

            var maxX = desktop.offsetWidth - self.modalDiv.offsetWidth;
            var minX = 0;
            var maxY = desktop.offsetHeight - self.modalDiv.offsetHeight;
            var minY = 0;

            var desiredX = event.clientX + parseInt(offset[0], 10);
            var desiredY = event.clientY + parseInt(offset[1], 10);

            if (desiredX < maxX && desiredX > minX) {
                self.modalDiv.style.left = desiredX + 'px';
            }
            else {
                if (desiredX > maxX) {
                    self.modalDiv.style.left = maxX + 'px';
                }
                else {
                    self.modalDiv.style.left = minX + 'px';
                }
            }

            if (desiredY < maxY && desiredY > minY) {
                self.modalDiv.style.top = desiredY + 'px';
            }
            else {
                if (desiredY > maxY) {
                    self.modalDiv.style.top = maxY + 'px';
                }
                else {
                    self.modalDiv.style.top = minY + 'px';
                }
            }

            self.isDragging = false;
            event.preventDefault();
            return false;
        }
    };

    self.dragStart = function (event) {
        self.setActive();
        self.isDragging = true;
        var style = window.getComputedStyle(event.target, null);
        event.dataTransfer.setData("Text",
        (parseInt(style.getPropertyValue("left"), 10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY));
    };
};