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
        tempStr += message.getText();
        tempStr += "</p></div></div><div class='small-2 columns'><a class='button tiny alert'";
        tempStr += "id='" + number +"'" + ">Ta bort</a></div>";

        row.innerHTML = tempStr;
    },

    renderMessages: function (messages) {
        document.querySelector("#messageBoard").innerHTML = "";

        for (var i = 0; i < messages.length; i++) {
            MessageBoard.renderMessage(messages[i], i);
        }

        var deleteButtons = document.querySelectorAll("#messageBoard div a");
        deleteButtons.forEach(function (a) {
            a.addEventListener("click", MessageBoard.deleteMessage, false)
        });
    },

    deleteMessage: function (e) {
        var container = this.parentElement;
        var div = container.parentElement;
        var textareadiv = div.firstChild;
        var textarea = textareadiv.firstChild;
        var p = textarea.firstChild;
        var text = p.innerHTML;

        for (var i = 0; i < MessageBoard.messages.length; i++) {
            if (MessageBoard.messages[i].getText() === text) {
                MessageBoard.messages.splice(i, 1);
            }
        }

        MessageBoard.renderMessages(MessageBoard.messages);
    }
};

window.onload = MessageBoard.init();
MessageBoard.submitButton.addEventListener("click", MessageBoard.submit, false);
MessageBoard.textArea.addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
        if (e.shiftKey === true) {
        }
        else {
            console.log("enter");
            MessageBoard.submit();
            e.preventDefault();
        }
    }
});

