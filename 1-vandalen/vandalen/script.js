"use strict";

var makePerson = function(persArr) {
   var result = {};

   var ages = [];
   var names = [];
   var totalAge = 0;
   
   function addNamesAndAge(person) {
       ages.push(person.age);
       names.push(person.name);
       totalAge += person.age;
   }
   
   persArr.forEach(addNamesAndAge);
   ages.sort();
   
   names.sort(function(a,b) {
    return a.localeCompare(b);
    });
    
   names = names.join(", ");
   
   result = {
       minAge : ages[0],
       maxAge : ages[ages.length - 1],
       averageAge : Math.ceil(totalAge / ages.length),
       names : names
   };

   return result;
}

var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];

var result = makePerson(data);

console.log(result);
