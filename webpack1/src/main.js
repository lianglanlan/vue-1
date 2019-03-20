var $ = require("jquery");

import './css/index.css'
import './css/index.less'
import './css/index.scss'

import 'bootstrap/dist/css/bootstrap.min.css'

$(function () {
    $('li:odd').css('backgroundColor', 'yellow')
    $('li:even').css('backgroundColor', function () {
        return '#' + 'D97634'
    })
})

// class Person {
//     static info = {name:'zs',age:20}    //静态属性
// }
// var p1 = new Person()


