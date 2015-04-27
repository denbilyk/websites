var counter = (function () {
    var i = 0;
    return function () {
        return ++i;
    };

})();

console.log(counter());
console.log(counter());


var a = {
    name: "Den",
    age: 27,
    sayHi: function () {
        return "Hi, " + this.name;
    },

    greet: say


};
console.log(a);

var  c = Object.create({x:10, y:15});
console.log(c.hasOwnProperty('x'));
console.log(c);
c.x = 20;
console.log(c);
console.log(c.hasOwnProperty('x'));
console.log(c);
delete c.x;
console.log(c);


var say = function(greeting) {
    return greeting + " This is " + this.name;
};

var r = {
    name: undefined,
    age: null,
    greet: say
};


console.log(r.greet("Hi!"));
console.log(r.greet.apply(a, ["Hello!"]));
var bound = say.bind(a);
console.log(bound('Bonjour!'));



