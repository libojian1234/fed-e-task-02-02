import createHeading from './heading.js'
import './main.css'
import icon from './logo.png'

const heading = createHeading()

document.body.append(heading)

const img = new Image()
img.src = icon
document.body.append(img)

//跨域请求
// const ul = document.createElement('ul')
// document.body.append(ul)
// fetch('api/users')
//     .then(res => res.json())
//     .then(data => {
//         data.forEach(item => {
//             const li = document.createElement('li')
//             li.textContent = item.login
//             ul.append(li)
//         });
//     })
debugger
if(module.hot){
    //处理./heading.js 的热更新
    module.hot.accept('./heading',()=>{
        console.log('heading 模块更新了，需要在这里手动处理热替换逻辑')
    })
    //处理图片的热更新
    module.hot.accept('./logo.png',()=>{
        img.src = icon
        console.log(icon)
    })
}