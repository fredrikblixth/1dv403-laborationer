'use strict';

if(!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

var MessageBoard = {

    messages: [],
    submitButton: document.querySelector("#submitButton"),
    textArea: document.querySelector("textarea"),
    deleteButtons: document.querySelectorAll("#messageBoard div a"), 

    init: function (e) {
        MessageBoard.renderMessages(MessageBoard.messages)
    },

    submit: function () {
        var mess = new Message(MessageBoard.textArea.value, new Date());
        MessageBoard.messages.push(mess);
        MessageBoard.renderMessages(MessageBoard.messages);
        MessageBoard.textArea.value = "";
    },

    renderMessage: function (message, number) {
        var messageBoard = document.querySelector("#messageBoard");
        var row = document.createElement("div");
        row.classList.add("row");
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
    },

    deleteMessage: function (e) {
        MessageBoard.messages.splice(e.getAttribute("id"), 1)
        Console.log(MessageBoard.messages);
        MessageBoard.renderMessages(MessageBoard.messages);
    }
};

window.onload = MessageBoard.init();
MessageBoard.submitButton.addEventListener("click", MessageBoard.submit, false);
MessageBoard.deleteButtons.forEach(function (a) {
    a.addEventListener("click", MessageBoard.deleteMessage, false)
});
