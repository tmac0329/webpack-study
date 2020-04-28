class Cat{
    constructor(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }
}
let cat = new Cat('Jerry');
console.log(cat.name);