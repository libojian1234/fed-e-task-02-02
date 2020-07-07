const marked = require('marked')

module.exports = source => {
    //loader 返回的结果必须是js代码，通常直接返回js代码的字符串或者使用另一个loader返回


    // console.log(source)
    // return 'console.log("hello~")'

    const html = marked(source)
    // return `module.exports = ${JSON.stringify(html)}`


    //返回 html 字符串交给下一个 loader 处理
    return html
}