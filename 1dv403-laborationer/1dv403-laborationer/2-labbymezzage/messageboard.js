'use strict';

if(!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

var MessageBoard = {

    messages: [],
    submitButton: document.querySelector("#submitButton"),
    textArea: document.querySelector("textarea"),

    init: function (e) {
        MessageBoard.renderMessages(MessageBoard.messages);
        MessageBoard.renderMessageCount();
        MessageBoard.submitButton.addEventListener("click", MessageBoard.submit, false);
        MessageBoard.textArea.addEventListener("keypress", function (e) {
            if (e.keyCode === 13) {
                if (e.shiftKey === true) {
                    return;
                }
                else {
                    MessageBoard.submit();
                    e.preventDefault();
                }
            }
        });
    },

    submit: function () {
        if (MessageBoard.textArea.value) {
            var mess = new Message(MessageBoard.textArea.value, new Date());
            MessageBoard.messages.push(mess);
            MessageBoard.renderMessages(MessageBoard.messages);
            MessageBoard.textArea.value = "";
        }
    },

    renderMessage: function (message, id) {
        var messageBoard = document.querySelector("#messageBoard");
        var labelRow = document.createElement("div");
        var row = document.createElement("div");
        labelRow.setAttribute("class", "row");
        row.setAttribute("class", "row");
        messageBoard.appendChild(labelRow);
        messageBoard.appendChild(row);
        var tempStr = "<div class='large-8 columns'>" + "<span class='label right'>" + message.getDate().getHours() + ":" + message.getDate().getMinutes() + ":" + message.getDate().getSeconds() + "</span>";

        labelRow.innerHTML = tempStr;

        tempStr = "<div class='large-8 columns'>";
        tempStr += "<div class='panel callout' data-id='"+ id +"'><p>";
        tempStr += message.getHTMLText();
        tempStr += "</p></div></div><div class='small-4 columns' data-id='" + id + "'><a class='button tiny alert delete'";
        tempStr += ">Ta bort</a><a href='#' class='button tiny date'>Tid</a><a href='#' class='button tiny edit'>Ändra</a></div>";

        row.innerHTML = tempStr;
    },

    renderMessages: function (messages) {
        document.querySelector("#messageBoard").innerHTML = "";

        for (var i = 0; i < messages.length; i++) {
            MessageBoard.renderMessage(messages[i], i);
        }

        var deleteButtons = document.querySelectorAll("#messageBoard div a.delete");
        deleteButtons.forEach(function (a) {
            a.addEventListener("click", MessageBoard.deleteMessage, false);
        });

        var timeButtons = document.querySelectorAll("#messageBoard div a.date");
        timeButtons.forEach(function (a) {
            a.addEventListener("click", MessageBoard.showMessageDate, false);
        });

        var editButtons = document.querySelectorAll("#messageBoard div a.edit");
        editButtons.forEach(function (a) {
            a.addEventListener("click", MessageBoard.editMessage, false);
        });

        MessageBoard.renderMessageCount();
    },

    deleteMessage: function (e) {
        e.preventDefault();
        var container = this.parentElement;
        var messageId = container.getAttribute("data-id");
        MessageBoard.messages.splice(messageId, 1);
        MessageBoard.renderMessages(MessageBoard.messages);
    },

    showMessageDate: function (e) {
        e.preventDefault();
        var container = this.parentElement;
        var messageId = container.getAttribute("data-id");
        alert(MessageBoard.messages[messageId].getDateText());
    },

    countMessages: function () {
        return MessageBoard.messages.length;
    },

    renderMessageCount: function () {
        var span = document.querySelector("#numberOfMessages");
        span.innerHTML = "";
        var tempStr = "Antal meddelanden: " + MessageBoard.countMessages();
        span.innerHTML = tempStr;
    },

    editMessage: function (e) {
        var buttonDiv = this.parentElement;
        var messageId = buttonDiv.getAttribute("data-id");
        var textContainer = buttonDiv.previousElementSibling;
        var textPanel = textContainer.querySelector("div.panel");
        e.preventDefault();

        var p = textPanel.querySelector("p");
        var text = p.innerHTML;

        textContainer.innerHTML = "<textarea id='editTextArea'></textarea>";
        var editTextArea = textContainer.querySelector("#editTextArea");
        editTextArea.focus();
        editTextArea.innerHTML = text;
        

        buttonDiv.innerHTML = "<a href='#' class='button tiny' id='saveButton' data-id='" + messageId + "'>Spara</a>";
        var saveButton = buttonDiv.querySelector("#saveButton");

        var saveChange = function (e) {
            e.preventDefault();
            MessageBoard.messages[messageId].setText(editTextArea.value);
            MessageBoard.renderMessages(MessageBoard.messages);
        };

        saveButton.addEventListener("click", saveChange, false);
        editTextArea.addEventListener("keypress", function (e) {
            if (e.keyCode === 13) {
                if (e.shiftKey === true) {
                    return;
                }
                else {
                    MessageBoard.messages[messageId].setText(editTextArea.value);
                    MessageBoard.renderMessages(MessageBoard.messages);
                    e.preventDefault();
                }
            }
        });
    }
};

window.onload = MessageBoard.init();


