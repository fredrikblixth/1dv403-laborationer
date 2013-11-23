"use strict";

var makePerson = function(persArr) {
   var result = {};

   var ages = [];
   var names = [];
   var totalAge = 0;
   
   function isInteger(x) {
       return (x % 1 === 0) ? true : false;
   }
   
   function addNamesAndAge(person) {
       if(!isNaN(person.age) && isInteger(person.age))
       {
           ages.push(person.age);
           totalAge += person.age;
       }
       if(typeof(person.name) === "string"){
           names.push(person.name);
       }
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
