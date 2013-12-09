'use strict';

if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

var MemoryBoard = function (rows, cols, boardNumber) {
    var self = this;
    this.imageArray = [];
    this.currentImage = 0;
    this.rows = rows;
    this.cols = cols;
    this.totalNumberOfGuesses = 0;
    this.currentGuess = 0
    this.memoryBoardDiv = document.createElement("div");
    self.memoryBoardDiv.setAttribute("class", "messageBoard" + boardNumber);

    this.init = function () {
        this.imageArray = RandomGenerator.getPictureArray(this.rows, this.cols);
        var body = document.querySelector("body");
        var rowDiv = document.createElement("div");
        rowDiv.setAttribute("class", "row");
        var headerDiv = document.createElement("div");
        headerDiv.setAttribute("class", "large-12 columns");
        var h1 = document.createElement("h1");
        h1.textContent = "Memory " + boardNumber + "!";


        this.renderBoard(self.memoryBoardDiv);
        headerDiv.appendChild(h1);
        rowDiv.appendChild(headerDiv);
        body.insertBefore(self.memoryBoardDiv, body.firstChild);
        body.insertBefore(rowDiv, body.firstChild);

        self.addClickEvent();
    };

    this.addClickEvent = function () {
        var as = self.memoryBoardDiv.querySelectorAll("a.secret");
        console.log(as.length);
        as.forEach(function (a) {
            a.addEventListener("click", self.makeGuess, false);
        });
    };

    this.renderBoard = function (memoryBoardDiv) {
        
        for(var i = 0; i < rows; i++){
            this.renderRow(memoryBoardDiv);
        }
    };

    this.renderRow = function (memoryBoardDiv) {
        var row = document.createElement("div");
        row.setAttribute("class", "row");
        var columnDiv = document.createElement("div");
        columnDiv.setAttribute("class", "large-12 columns");
        var gridUl = document.createElement("ul");
        gridUl.setAttribute("class", "small-block-grid-8");

        for (var i = 0; i < cols; i++) {
            var li = this.renderSecretElement(this.currentImage);
            gridUl.appendChild(li);
            this.currentImage++;
        }

        columnDiv.appendChild(gridUl);
        row.appendChild(columnDiv);
        memoryBoardDiv.appendChild(row);
    };

    this.renderSecretElement = function (imageNumber) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.setAttribute("class", "secret");
        a.setAttribute("href", "#");
        var img = document.createElement("img");
        img.setAttribute("class", "th");
        img.setAttribute("src", "pics/0.png");
        img.setAttribute("data-id", this.imageArray[imageNumber]);
        a.appendChild(img);
        li.appendChild(a);

        return li;
    };

    this.makeGuess = function (e) {
        if(self.currentGuess < 2) {
            console.log("click!!")
            this.removeAttribute("class");
            this.removeEventListener("click", self.makeGuess, false);
            e.stopPropagation();
            e.preventDefault();
            var currentImage = this.firstChild;
            self.openImage(currentImage);

            if (self.currentGuess === 2) {
                self.currentGuess = 0;
                var wait = 1000;
                setTimeout(function () {
                    self.checkAnswers();
                }, wait);
            }
            self.addClickEvent();
        }
    };

    this.openImage = function (image) {
        self.currentGuess++;
        var imageNumber = image.getAttribute("data-id");
        image.setAttribute("class", "th");
        image.setAttribute("src", "pics/" + imageNumber + ".png");
        image.setAttribute("id", "guess" + self.currentGuess);
    };

    this.checkAnswers = function () {
        self.totalNumberOfGuesses++;
        console.log(self.memoryBoardDiv);
        var guess1 = self.memoryBoardDiv.querySelector("#guess1");
        var guess2 = self.memoryBoardDiv.querySelector("#guess2");

        if (guess1.getAttribute("data-id") === guess2.getAttribute("data-id")) {
            self.correctImage(guess1);
            self.correctImage(guess2);
        }
        else {
            self.closeImage(guess1);
            self.closeImage(guess2);
        }
    };

    this.closeImage = function (image) {
        var a = image.parentElement;
        a.setAttribute("class", "secret");
        image.setAttribute("src", "pics/0.png");
        image.removeAttribute("id");
    };

    this.correctImage = function (image) {
        var a = image.parentElement;
        a.removeAttribute("class");
        image.removeAttribute("id");
    };
}

var mem1 = new MemoryBoard(4, 4, 1);
var mem2 = new MemoryBoard(4, 2, 2);
window.onload = mem1.init(), mem2.init();