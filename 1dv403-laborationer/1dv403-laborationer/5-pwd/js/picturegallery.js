'use strict';

var PictureGallery = function () {
    var self = this;
    var thumbHeight = 0;
    var thumbWidth = 0;
    var images = [];
    var numberOfRows = 0;
    var currentImage = 0;
    self.galleryDiv = document.createElement("div");
    var loaderGif = document.createElement("img");
    loaderGif.setAttribute("src", "pics/ajax-loader.gif");
    loaderGif.setAttribute("draggable", "false");
    loaderGif.style.position = "absolute";
    loaderGif.style.top = "140px";
    loaderGif.style.left = "130px";
    self.galleryDiv.appendChild(loaderGif);
    var picArray = [];

    self.getPics = function (pics) {
        self.galleryDiv.removeChild(loaderGif);
        picArray = $.parseJSON(pics);

        picArray.forEach(function (pic) {
            self.calculateWidthAndHeight(pic);
        });

        picArray.forEach(function (pic) {
            self.createPicElement(pic);
        });

        self.calculateRows();
        self.addGallery();
    };

    self.calculateRows = function () {
        numberOfRows = Math.ceil(images.length / 4);
    };

    self.calculateWidthAndHeight = function (pic) {
        thumbHeight = (thumbHeight < pic.thumbHeight) ? pic.thumbHeight : thumbHeight;
        thumbWidth = (thumbWidth < pic.thumbWidth) ? pic.thumbWidth : thumbWidth;
    };

    self.createPicElement = function (pic) {
        var img = document.createElement("img");
        img.setAttribute("src", pic.thumbURL);
        img.setAttribute("class", "th");
        img.style.width = thumbWidth + "px";
        img.style.height = thumbHeight + "px";
        img.setAttribute("draggable", false);

        img.addEventListener("click", self.openImageModal, false);

        images.push(img);
    };

    self.addGallery = function () {
        for (var i = 0; i < numberOfRows; i++) {
            if (currentImage > images.length) {
                break;
            }
            var row = self.addRow();
            self.galleryDiv.appendChild(row);
        }
    };

    self.addRow = function () {
        var rowDiv = document.createElement("div");
        rowDiv.setAttribute("class", "row");

        var ul = document.createElement("ul");
        ul.setAttribute("class", "large-block-grid-4");

        for (var i = 0; i < 4; i++) {
            if (currentImage < images.length) {
                var li = self.addImage();
                ul.appendChild(li);
            }
        }
        rowDiv.appendChild(ul);

        return rowDiv;
    };

    self.addImage = function () {
        var li = document.createElement("li");
        li.appendChild(images[currentImage]);
        currentImage++;
        return li;
    }

    self.getPictureDiv = function () {
        return self.galleryDiv;
    };

    self.openImageModal = function (e) {
        var thumbUrl = e.srcElement.getAttribute("src");
        var bigPicUrl = "";
        var bigPicHeight = 0;
        var bigPicWidth = 0;

        picArray.forEach(function (pic) {
            if (pic.thumbURL === thumbUrl) {
                bigPicUrl = pic.URL;
                bigPicHeight = pic.height;
                bigPicWidth = pic.width;
            }
        });

        var image = document.createElement("img");
        image.setAttribute("draggable", false);
        image.setAttribute("src", bigPicUrl);
        image.style.width = bigPicWidth +"px";
        image.style.height = bigPicHeight +"px";

        var modal = new Modal("picture");
        modal.setSize(bigPicWidth, bigPicHeight);
        modal.renderContent(image);
        modal.setActive();
        e.stopPropagation();

        var hint = document.createElement("div");
        hint.setAttribute("class", "balloon bottom");

        var width = document.createElement("p");
        width.setAttribute("class", "padding5")
        width.innerText = "Bredd: " + bigPicWidth + " pixlar";

        var height = document.createElement("p");
        height.setAttribute("class", "padding5");
        height.innerText = "Höjd: " + bigPicHeight + " pixlar";

        hint.appendChild(width);
        hint.appendChild(height);

        var showToolTip = function (e) {
            e.srcElement.parentElement.parentElement.appendChild(hint);
        };

        var removeToolTip = function (e) {
            e.srcElement.parentElement.parentElement.removeChild(hint);
        };

        image.addEventListener("mouseover", showToolTip, false);
        image.addEventListener("mouseout", removeToolTip, false);
        
    };

    var ajaxCon = new AjaxCon("http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", self.getPics);
}