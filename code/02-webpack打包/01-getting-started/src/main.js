// import createHeading from './heading.js'
// import './main.css'
// import icon from './logo.png'

// const heading = createHeading()

// document.body.append(heading)

// const img = new Image()
// img.src = icon
// document.body.append(img)


// 部分 loader 加载的资源中一些用法也会触发资源模块加载

import './main.css'

import footerHtml from './footer.html'

document.write(footerHtml)

