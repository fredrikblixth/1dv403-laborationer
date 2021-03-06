"use strict";

window.onload = function(){

	
	var birthday = function(date){
        
        if(!/^\d{4}\-\d{2}\-\d{2}$/.test(date)) {
            throw {
                name: "InvalidDateException",
                level: "Show stopper",
                message: "The date format is invalid. Try again.",
                toString: function(){return this.name + ": " + this.message; }
            };
        }

        var originalBirthday = new Date(date);
        var today = new Date();
        var nextBirthday = new Date((today.getFullYear()), originalBirthday.getMonth(), originalBirthday.getDate());

        var milliSecondsToNextBirthday = nextBirthday.getTime() - today.getTime();

        if (isNaN(milliSecondsToNextBirthday)) {
            throw {
                name: "InvalidDateException",
                level: "Show stopper",
                message: "The date format is invalid. Try again",
                toString: function(){return this.name + ": " + this.message; }
            };
        }

        return Math.ceil(milliSecondsToNextBirthday / (1000 * 60 * 60 * 24));
	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = birthday(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};