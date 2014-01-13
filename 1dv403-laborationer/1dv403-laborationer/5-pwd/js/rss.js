'use strict';

var RssReader = function () {

    var self = this;
    var xhr = new XMLHttpRequest();
    var div = document.createElement("div");



    self.getRssHTML = function () {
        xhr.onreadystatechange = function () {
            console.log("hejzan");
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    console.log(xhr.responseText);
                    div.innerHTML = xhr.responseText;
                }
                else {
                    console.log("Läsfel, status:" + xhr.status);
                }
            }
        };
        xhr.open("get", "http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url=" + escape("http://www.dn.se/m/rss/senaste-nytt"), true);
        xhr.send(null);

        return div;
    }
}