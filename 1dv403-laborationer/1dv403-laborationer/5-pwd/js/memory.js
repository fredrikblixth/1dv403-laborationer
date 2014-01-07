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
    this.numberOfImagePairs = 0;
    this.correctAnswers = 0;
    this.currentGuess = 0;
    this.gameFinished = false;
    this.memoryBoardDiv = document.createElement("div");
    self.memoryBoardDiv.setAttribute("class", "memoryBoard" + boardNumber);

    this.init = function () {
        self.imageArray = RandomGenerator.getPictureArray(self.rows, self.cols);
        self.numberOfImagePairs = self.imageArray.length / 2;
        var body = document.querySelector("body");
        var rowDiv = document.createElement("div");
        rowDiv.setAttribute("class", "row");
        var headerDiv = document.createElement("div");
        headerDiv.setAttribute("class", "large-12 columns");
        var resultRow = document.createElement("div");
        resultRow.setAttribute("class", "row");
        var resultDiv = document.createElement("div");
        resultDiv.setAttribute("id", "result" + boardNumber);
        resultRow.appendChild(resultDiv);


        self.renderBoard(self.memoryBoardDiv);
        rowDiv.appendChild(headerDiv);

        var memory = document.createElement("div");
        memory.appendChild(rowDiv);
        memory.appendChild(self.memoryBoardDiv);
        memory.appendChild(resultRow);

        //body.insertBefore(resultRow, body.firstChild);
        //body.insertBefore(self.memoryBoardDiv, body.firstChild);
        //body.insertBefore(rowDiv, body.firstChild);

        self.addClickEvent();

        return memory;
    };

    this.addClickEvent = function () {
        var as = self.memoryBoardDiv.querySelectorAll("a");
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
        gridUl.setAttribute("class", "large-block-grid-4");

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
        if (e.srcElement.getAttribute("id") === "guess1" || e.srcElement.getAttribute("id") === "guess2" || self.gameFinished) {
            return;
        }
        if (e.srcElement.parentElement.getAttribute("class") === "correct") {
            return;
        }
        if (self.currentGuess < 2) {
            this.removeAttribute("class");
            self.openImage(e.srcElement);

            if (self.currentGuess === 2) { 
                var wait = 1000;
                setTimeout(function () {
                    self.checkAnswers();
                }, wait);
            }
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
        self.currentGuess = 0;
        self.totalNumberOfGuesses++;
        console.log(self.memoryBoardDiv);
        var guess1 = self.memoryBoardDiv.querySelector("#guess1");
        var guess2 = self.memoryBoardDiv.querySelector("#guess2");

        if (guess1.getAttribute("data-id") === guess2.getAttribute("data-id")) {
            self.correctImage(guess1);
            self.correctImage(guess2);
            self.correctAnswers++;
        }
        else {
            self.closeImage(guess1);
            self.closeImage(guess2);
        }

        if (self.correctAnswers === self.numberOfImagePairs) {
            self.gameFinished = true;
            self.renderResult();
        };
    };

    this.closeImage = function (image) {
        var a = image.parentElement;
        a.setAttribute("class", "secret");
        image.setAttribute("src", "pics/0.png");
        image.removeAttribute("id");
    };

    this.correctImage = function (image) {
        var a = image.parentElement;
        a.setAttribute("class", "correct");
        image.removeAttribute("id");
    };

    this.renderResult = function () {
        var result = document.querySelector("#result" + boardNumber);
        var h5 = document.createElement("h5");
        h5.textContent = "Grattis! Du vann!! det tog " + self.totalNumberOfGuesses + " gissningar!";
        result.appendChild(h5);
    };
}