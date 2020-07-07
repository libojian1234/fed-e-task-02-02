// import $ from 'jquery'
import foo from './foo'
import './style.css'
import logoo from'./logo.png'

foo.bar()

//动态导入jquery
import('jquery').then( $ => {
    $(document.body).append('<h1>hello Parcel11</h1>')

    $(document.body).append(`<img src="${logoo}" />`)
})


if(module.hot){
    module.hot.accept(() => {
        console.log('hmr')
    })
}