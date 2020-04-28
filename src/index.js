import './index.less';
import '../public/js/test.js';
import someone from '../public/js/importFile.js'
import '../public/css/test.css';
import '../public/css/test2.css';

if(module && module.hot){
    module.hot.accept()
}

let exampleRequire = require('../public/js/requireFile.js');

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

console.log('You are using "import" '+someone.name+'.');

exampleRequire.requireTestFun();