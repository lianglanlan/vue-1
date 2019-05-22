//封装方法。传入文件路径，可以读取文件并将内容返回

const fs = require('fs')
const path = require('path')

//普通提取
// fs.readFile(path.join(__dirname,'./files/1.txt'),'utf-8',(err,dataStr) => {
//     if(err) throw err
//     console.log(dataStr)
// })

//封装函数
// function getFileByPath(fpath) {
//     fs.readFile(fpath, 'utf-8', (err, dataStr) => {
//         if (err) throw err
//         return dataStr
//     })

// }

//readFile为异步处理函数，放到队列里继续运行主程序，直接跳到第18行代码，没有return，这个函数默认返回undefined，所以上述函数运行结果都是undefined

// var data = getFileByPath(path.join(__dirname, './files/1.txt'))
// console.log(data)

//使用回调函数
// function getFileByPath(fpath, callback) {
//     fs.readFile(fpath, 'utf-8', (err, dataStr) => {
//         if (err) throw err
//         callback(dataStr)
//     })
// }

// getFileByPath(path.join(__dirname, './files/1.txt'), (data) => {
//     console.log(data)
// })

//将错误结果也进行返回，并规定成功的结果位于回调函数的第二个位置，失败的结果位于回调函数的第一个位置
// function getFileByPath(fpath, callback) {
//     fs.readFile(fpath, 'utf-8', (err, dataStr) => {
//         if (err) callback(err)
//         callback(null, dataStr)
//     }) 
// }

// getFileByPath(path.join(__dirname, './files/1.txt'), (err, data) => {
//     if (err) {
//         console.log(err.message)
//     } else {
//         console.log(data)
//     }
// })

//
// function getFileByPath(fpath, succCb, errCb) {
//     fs.readFile(fpath, 'utf-8', (err, dataStr) => {
//         if (err) return errCb(err)
//         succCb(dataStr)
//     })
// }

// getFileByPath(path.join(__dirname, './files/1.txt'), data => {
//     console.log(data)

//     getFileByPath(path.join(__dirname, './files/2.txt'), data => {
//         console.log(data)

//         getFileByPath(path.join(__dirname, './files/3.txt'), data => {
//             console.log(data)
//         })
//     })
// })


//node运行后，会打印出文件内容，说明异步函数被执行
//也就是说，在使用new关键字后，除了得到Promise实例，还会立即调用我们为Promise构造函数传递的function，执行function中的异步操作代码

function getFileByPath(fpath) {
    var promise = new Promise(function (resolve, reject) {
        fs.readFile(fpath, 'utf-8', (err, dataStr) => {
            if (err) return reject(err);
            resolve(dataStr)
        })
    })

    return promise
}
//resolve与reject为形参

// getFileByPath(path.join(__dirname, './files/1.txt')).then(data => {
//     console.log('文件1读取成功，开始读取文件2数据')
//     getFileByPath(path.join(__dirname, './files/2.txt')).then(data => {
//         console.log('文件2读取成功，开始读取文件3数据')
//         getFileByPath(path.join(__dirname, './files/3.txt')).then(data => {
//             console.log('文件3读取成功')
//         })
//     })
// })

getFileByPath(path.join(__dirname, './files/11.txt')).then(data => {
    console.log('文件1读取成功，开始读取文件2数据' + data)

    return getFileByPath(path.join(__dirname, './files/2.txt'))
}).then(data => {
    console.log('文件2读取成功，开始读取文件3数据' + data)

    return getFileByPath(path.join(__dirname, './files/3.txt'))
}).then(data => {
    console.log('文件3读取成功' + data)
}).catch(err => {   //如果前面有任何的Promise执行失败，会立即终止Promise执行，并进入catch中
    console.log('这是错误处理'+err.message)
})
