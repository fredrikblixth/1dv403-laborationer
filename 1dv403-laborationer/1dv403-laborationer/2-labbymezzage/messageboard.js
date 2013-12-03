'use strict';

if(!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

var MessageBoard = {

    messages: [],
    submitButton: document.querySelector("#submitButton"),
    textArea: document.querySelector("textarea"),

    init: function (e) {
        MessageBoard.renderMessages(MessageBoard.messages)
        MessageBoard.renderMessageCount();
    },

    submit: function () {
        if (MessageBoard.textArea.value) {
            var mess = new Message(MessageBoard.textArea.value, new Date());
            MessageBoard.messages.push(mess);
            MessageBoard.renderMessages(MessageBoard.messages);
            MessageBoard.textArea.value = "";
        }
    },

    renderMessage: function (message, number) {
        var messageBoard = document.querySelector("#messageBoard");
        var row = document.createElement("div");
        row.setAttribute("class", "row");
        messageBoard.appendChild(row);

        var tempStr = "<div class='large-10 columns'><div class='panel callout'><p>";
        tempStr += message.getHTMLText();
        tempStr += "</p></div></div><div class='small-2 columns' data-bind='" + message.toString() + "'><a class='button tiny alert delete'";
        tempStr += ">Ta bort</a><a class='button tiny date'>Tid</a></div>";

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

        MessageBoard.renderMessageCount();
    },

    deleteMessage: function (e) {
        var container = this.parentElement;
        var message = container.getAttribute("data-bind");
        
        for (var i = 0; i < MessageBoard.messages.length; i++) {
            if (MessageBoard.messages[i].toString() === message) {
                MessageBoard.messages.splice(i, 1);
            }
        }

        MessageBoard.renderMessages(MessageBoard.messages);
    },

    showMessageDate: function (e) {
        var container = this.parentElement;
        var message = container.getAttribute("data-bind");
        for (var i = 0; i < MessageBoard.messages.length; i++) {
            if (MessageBoard.messages[i].toString() === message) {
                alert(MessageBoard.messages[i].getDateText());
            }
        }
    },

    countMessages: function () {
        return MessageBoard.messages.length;
    },

    renderMessageCount: function () {
        var span = document.querySelector("#numberOfMessages");
        span.innerHTML = "";
        var tempStr = "Antal meddelanden: " + MessageBoard.countMessages();
        span.innerHTML = tempStr;
    }
};

window.onload = MessageBoard.init();
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

