'use strict';

var PictureGallery = function () {
    var self = this;
    var thumbHeight = 0;
    var thumbWidth = 0;
    var images = [];
    var numberOfRows = 0;
    var currentImage = 0;
    self.galleryDiv = document.createElement("div");

    self.getPics = function (pics) {
        var picArray = $.parseJSON(pics);
        
        picArray.forEach(function (pic) {
            self.calculateWidthAndHeight(pic);
        });

        picArray.forEach(function (pic) {
            self.createPicElement(pic);
        });
        
        self.calculateRows();
        self.addGallery();
    }

    self.calculateRows = function () {
        numberOfRows = Math.ceil(images.length / 4);
    }

    self.calculateWidthAndHeight = function (pic) {
        thumbHeight = (thumbHeight < pic.thumbHeight) ? pic.thumbHeight : thumbHeight;
        thumbWidth = (thumbWidth < pic.thumbWidth) ? pic.thumbWidth : thumbWidth;
    }

    self.createPicElement = function (pic) {
        var img = document.createElement("img");
        img.setAttribute("src", pic.thumbURL);
        img.setAttribute("class", "th");
        img.style.width = thumbWidth + "px";
        img.style.height = thumbHeight + "px";
        img.setAttribute("draggable", false);
        images.push(img);
    }

    self.addGallery = function () {
        for (var i = 0; i < numberOfRows; i++) {
            if(currentImage > images.length)
            {
                break;
            }
            var row = self.addRow();
            self.galleryDiv.appendChild(row);
        }
    }

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
    }

    self.addImage = function () {
        var li = document.createElement("li");
        li.appendChild(images[currentImage]);
        currentImage++;
        return li;
    }

    var ajaxCon = new AjaxCon("http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", self.getPics);

    self.getPictureDiv = function () {
        return self.galleryDiv;
    }
}