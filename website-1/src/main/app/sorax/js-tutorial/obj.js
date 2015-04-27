var Person = {
    constructor: function (name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        return this;
    },

    greet: function () {
        return "Hi, this is " + this.name + " Age: " + this.age + " Gender: " + this.gender;
    }
};

var WebDeveloper = Object.create(Person);
WebDeveloper.constructor = function (name, age, gender, skills) {
    Person.constructor.apply(this, arguments);
    this.skills = skills;
    return this
};

var SuperPerson = function (name) {
    this.name = name;
};


SuperPerson.prototype.greet = function () {
    return "Hi, this is " + this.name;
};

var Devel = function (name, skills) {
    SuperPerson.apply(this, arguments);
    this.skills = skills || [];
};

Devel.prototype = Object.create(SuperPerson.prototype);
Devel.prototype.constructor = Devel;


(function () {
    console.log(Person);
    var den = Object.create(Person).constructor("Den", 27, "male");
    console.log(den);

    var devel = Object.create(WebDeveloper).constructor("Bob", 22, 'male', ['java', 'sql', 'jdbc']);
    console.log(devel);
    console.log(devel.skills);

    var devel2 = Object.create(WebDeveloper).constructor("Bob", 22, 'male', ['html', 'js', 'css']);
    console.log(devel2.skills);

    console.log(devel.skills);
    console.log('===================================================')

    var sp = new SuperPerson('Den');
    console.log(sp);
    console.log(sp.greet());


    var sd = new Devel('SuperDen', ['html', 'css', 'js']);
    console.log(sd);
    console.log(sd.greet());
    console.log(sd.skills);
    console.log(Devel.prototype.toString.call('/\w/'));
})();


