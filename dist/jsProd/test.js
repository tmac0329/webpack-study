class Person{
    constructor(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }
}

const person = new Person('Tom');
console.log(person.name);