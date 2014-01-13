'use strict';

var AjaxCon = function (url, callback) {
    var READY_STATE_UNINITIALIZED = 0;
    var READY_STATE_OPENED = 1;
    var READY_STATE_SENT = 2;
    var READY_STATE_LOADING = 3;
    var READY_STATE_COMPLETE = 4;

    var xhr = this.getXHR();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === READY_STATE_COMPLETE) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                callback(xhr.responseText);
            }
            else {
                console.log("Läsfel, status:" + xhr.status);
            }
        }
    };

    xhr.open("get", url, true);

    xhr.send(null);
}

AjaxCon.prototype.getXHR = function () {
    return new XMLHttpRequest();
}