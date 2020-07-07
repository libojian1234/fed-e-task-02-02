import './heading.css'
console.log(2222)
export default () => {
    console.log(11111)

    const element = document.createElement('h2')

    element.textContent = 'Hello world'
    element.classList.add('heading')
    element.addEventListener('click', () => {
        alert('Hello webpack')
    })
    alert(1111111)

    return element
}