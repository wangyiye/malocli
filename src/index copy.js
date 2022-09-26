import './index.css';
import './less.less';
import './sass.scss';

import jpg from './assets/jpg.jpeg';
import png from './assets/png.png';
import icon from './assets/icon.ico';
import txt from './assets/txt.txt';

console.log('jpg', jpg);
console.log('icon', icon);
console.log('txt', txt);
console.log('png', png);

// 装饰器

function readonly(t, k, d) {
  d.writable = true;
}

class Class {
    @readonly name = 'malo'
}

const instanceI = new Class();
instanceI.age = 10000;
instanceI.name = 'zjy';

function AA(){
    let a = 1;
    let bb = 2;
    return a + bb
}

console.log(instanceI.__proto__.__proto__,AA.prototype);
