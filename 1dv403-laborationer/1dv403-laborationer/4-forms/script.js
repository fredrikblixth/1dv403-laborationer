"use strict";

if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

var PaymentPlanForm = function () {

    var self = this;
    var purchaseConfirmed = false;

    this.Init = function () {
        self.addEvents();
    };

    self.addEvents = function () {
        var inputs = document.querySelectorAll("input");
        inputs.forEach(function (input) {
            input.addEventListener("blur", self.inputValidation, false);
        });

        var submit = document.querySelector("#submitForm");
        submit.addEventListener("click", self.submitValidation, false);

        var confirmButton = document.querySelector("#confirmButton");
        confirmButton.addEventListener("click", self.confirmPurchase, false);
    };

    self.inputValidation = function (e) {
        var text = e.srcElement.value;
        var elementId = e.srcElement.getAttribute("id");
        var successfulValidation = false;

        switch (elementId) {
            case "firstname":
            case "lastname":
                successfulValidation = self.emptyInputValidator(text);
                break;
            case "zipCode":
                successfulValidation = self.zipCodeValidator(text);
                break;
            case "email":
                successfulValidation = self.emailValidator(text);
                break;
            default:
                break;
        }

        if (!successfulValidation) {
            self.renderValidationError(elementId);
        }
        else {
            if (elementId === "zipCode") {
                self.formatZipCode(elementId);
            }

            self.renderValidationSuccess(elementId);
        }
    };
    
    self.formatZipCode = function (elementId) {
        var input = document.querySelector("#" + elementId);
        var text = input.value;
        var formatedText = text.replace("SE", "");
        formatedText = formatedText.replace("-", "");
        formatedText = formatedText.replace(" ", "");

        input.value = formatedText;
    };

    self.submitValidation = function (e) {
        var inputs = document.querySelectorAll("input");
        var numberOfErrors = 0;
        
        inputs.forEach(function (input) {
            var elementId = input.getAttribute("id");
            var text = input.value;
            var successfulValidation;

            switch (elementId) {
                case "firstname":
                case "lastname":
                    successfulValidation = self.emptyInputValidator(text);
                    numberOfErrors++;
                    break;
                case "zipCode":
                    successfulValidation = self.zipCodeValidator(text);
                    numberOfErrors++;
                    break;
                case "email":
                    successfulValidation = self.emailValidator(text);
                    numberOfErrors++;
                    break;
                default:
                    break;
            }
            
            if (!successfulValidation) {
                self.renderValidationError(elementId);
            }
            else {
                numberOfErrors--;
                self.renderValidationSuccess(elementId);
            }
        });

        if (numberOfErrors !== 0) {
            e.stopImmediatePropagation();
        }
        else {
            self.populateModal();
            
            //if (!purchaseConfirmed) {
            //    console.log("rofl!")
            //    e.stopImmediatePropagation();
            //}
        }
        console.log("Submit!");
    };


    self.emptyInputValidator = function (text) {
        // Matcha a-zåäöÅÄÖ0-9.
        var regExp = /^[\wåäöÅÄÖ]+?$/;
        return regExp.test(text);
    };

    self.emailValidator = function (text) {
        // Matcha inte . i början av en emailadress. 1-64 tecken a-z0-9 innan @. Matcha inte . efter @. 4-253 tecken a-zåäö0-9 och - efter @.
        var regExp = /^(?!\.)(\w|-|\.){1,64}(?!\.)@(?!\.)[-.a-zåäö0-9]{4,253}$/;
        return regExp.test(text);
    };

    self.zipCodeValidator = function (text) {
        // Får börja med SE, ett mellanslag, tre siffror, ett mellanslag eller streck, avslutar med 2 siffror.
        var regExp = /^(SE){0,2}[\s]{0,1}[0-9]{3,3}[\s|-]{0,1}[0-9]{2,2}$/;
        return regExp.test(text);
    };

    self.renderValidationError = function (elementId) {
        var validationErrorMessage;
        var inputfield = document.querySelector("#" + elementId);
        var div = inputfield.parentNode;
        var HasErrorMessage = false;
        var divChildNodes = div.childNodes;

        divChildNodes.forEach(function (child) {
            if (child.tagName !== undefined) {
                if (child.tagName.toLowerCase() === "small") {
                    HasErrorMessage = true;
                };
            };
        });

        if (!HasErrorMessage) {
            switch (elementId) {
                case "firstname":
                case "lastname":
                    validationErrorMessage = "Fältet får inte vara tomt.";
                    break;
                case "zipCode":
                    validationErrorMessage = "Felaktigt format.";
                    break;
                case "email":
                    validationErrorMessage = "Kan ej tolkas som en giltig e-postadress!";
                    break;
                default:
                    break;
            };

            var small = document.createElement("small");
            small.textContent = validationErrorMessage;
            div.appendChild(small);
            div.setAttribute("class", div.getAttribute("class") + " error");
        };
    };

    self.renderValidationSuccess = function (elementId) {
        var inputfield = document.querySelector("#" + elementId);
        var div = inputfield.parentNode;
        var divChildNodes = div.childNodes;

        divChildNodes.forEach(function (child) {
            if (child.tagName !== undefined) {
                if (child.tagName.toLowerCase() === "small") {
                    div.setAttribute("class", "large-4 columns");
                    div.removeChild(child);
                };
            };
        });
    }

    self.populateModal = function () {
        var firstName = document.querySelector("#firstname");
        var lastName = document.querySelector("#lastname");
        var zipCode = document.querySelector("#zipCode");
        var email = document.querySelector("#email");
        var priceModel = document.querySelector("#priceModel");

        var firstNamePanel = document.querySelector("#firstnamePanel");
        var lastNamePanel = document.querySelector("#lastnamePanel");
        var zipCodePanel = document.querySelector("#zipCodePanel");
        var emailPanel = document.querySelector("#emailPanel");
        var priceModelPanel = document.querySelector("#priceModelPanel");

        firstNamePanel.textContent = firstName.value;
        lastNamePanel.textContent = lastName.value;
        zipCodePanel.textContent = zipCode.value;
        emailPanel.textContent = email.value;
        priceModelPanel.textContent = priceModel.value;
    }
    
    self.confirmPurchase = function () {
        purchaseConfirmed = true;
    }
}
var paymentPlanForm = new PaymentPlanForm();
window.onload = paymentPlanForm.Init();