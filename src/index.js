import './index.less';
import '../public/css/test.css';
import '../public/css/test2.css';

if(module && module.hot){
    module.hot.accept()
}

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