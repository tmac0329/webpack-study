import './index.less';
import '../public/js/test.js';
import someone from '../public/js/importFile.js'
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