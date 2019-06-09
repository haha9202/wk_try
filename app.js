 // app.js
 import '../css/common.css'
 import '../css/style.less'
//  引入jquery的方法 1
//  var $ = require("jquery")
// 2
 require("expose-loader?$!jquery")
 import 'bootstrap/dist/css/bootstrap.min.css'
 import 'bootstrap/dist/js/bootstrap.min'
 var obj1 = {
     name: 'obj1'
 }
 var obj2 = new Object({name:'obj2'})
 var M = function (n) {
     this.name = n
 }
 var obj3 = new M('obj3')

 var p = {name: 'obj4'}
 var obj4 = Object.create(p)
 console.log(obj1)
 console.log(obj2)
 console.log(obj3.constructor)
 console.dir(M)
 console.log(obj4)
 var str = '1'
 console.dir(str)
 // 原型


 //原型对象
// 每个构造函数都有一个原型对象,原型的想都包含一个指向构造函数的指针,实例也有一个指向原型对象的内部指针

 //原型链


 //构造函数

//  实例

// 闭包
var a = function () {
    var Num =0 
    this.inner = function  () {
        Num ++ 
        console.log(Num)
    }
}
var c = new a()
c.inner()
c.inner()