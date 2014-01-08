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
        var offset = event.dataTransfer.getData("text/plain").split(',');
        var dm = moveThis;

        var desktop = document.querySelector(".metro");

        var maxX = desktop.offsetWidth - dm.offsetWidth;
        var minX = 0;
        var maxY = desktop.offsetHeight - dm.offsetHeight;
        var minY = 0;

        var desiredX = event.clientX + parseInt(offset[0], 10);
        var desiredY = event.clientY + parseInt(offset[1], 10);

        if (desiredX < maxX && desiredX > minX) {
            dm.style.left = desiredX + 'px';
        }
        else {
            if (desiredX > maxX) {
                dm.style.left = maxX + 'px';
            }
            else {
                dm.style.left = minX + 'px';
            }
        }

        if (desiredY < maxY && desiredY > minY) {
            dm.style.top = desiredY + 'px';
        }
        else {
            if (desiredY > maxY) {
                dm.style.top = maxY + 'px';
            }
            else {
                dm.style.top = minY + 'px';
            }
        }

        event.preventDefault();
        return false;
    };

    self.dragStart = function (event) {
        event.srcElement.setAttribute("class", "window");
        moveThis = event.srcElement;
        var style = window.getComputedStyle(event.target, null);
        event.dataTransfer.setData("text/plain",
        (parseInt(style.getPropertyValue("left"), 10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY));
    };

    self.setFocus = function (event) {
        event.srcElement.setAttribute("class", "window");
    };

    self.setInactive = function (event) {
        event.srcElement.setAttribute("class", "window inactive");
    };
};

var desktop = new Desktop();
desktop.init();