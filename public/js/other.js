class Pig{
    constructor(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }
}

const pig = new Pig('Tom');
console.log(pig.name);