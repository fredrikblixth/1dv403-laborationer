'use strict';

if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

var MemoryBoard = {
    init: function () {
    }
};