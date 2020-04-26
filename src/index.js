import './index.less';
class Animal{
    constructor(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }
}

const dog = new Animal('nick');
console.log(dog.name);