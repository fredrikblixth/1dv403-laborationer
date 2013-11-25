'use strict';

function Message(message, date) {
    
    var text = message;
    var messageDate = date;
    
    this.getText = function () {
        return text;
    };
    
    this.setText = function () {
        message = text;
    };
    
    this.getDate = function () {
        return messageDate;
    };
    
    this.setDate = function () {
        date = messageDate;
    };
    
    return {text:this.text, messageDate:this.messageDate};
}

Message.prototype.toString = function () {
    return this.getText() + " (" + this.getDate() + ") ";
};

Message.prototype.getHTMLText = function () {
};

Message.prototype.getDateText = function () {
};
