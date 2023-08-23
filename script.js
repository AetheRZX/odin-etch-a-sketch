const DEFAULT_COLOR = '#333333'
const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 16

let current_color = DEFAULT_COLOR
let current_mode = DEFAULT_MODE
let current_size = DEFAULT_SIZE

function set_current_color (new_color)
{
    current_color = new_color
}

function set_current_mode (new_mode)
{
    activate_button(new_mode)
    current_mode = new_mode
}

function set_current_size (new_size)
{
    current_size = new_size
}

const color_picker = document.getElementById('color_picker')
const color_button = document.getElementById('color_button')
const rainbow_button = document.getElementById('rainbow_button')
const eraser_button = document.getElementById('eraser_button')
const clear_button = document.getElementById('clear_button')
const size_value = document.getElementById('size_value')
const size_slider = document.getElementById('size_slider')
const grid = document.getElementById('grid')

color_picker.oninput = (e) => set_current_color(e.target.value)
color_button.onclick = () => set_current_mode('color')
rainbow_button.onclick = () => set_current_mode('rainbow')
eraser_button.onclick = () => set_current_mode('eraser')
clear_button.onclick = () => reload_grid()

size_slider.onmousemove = (e) => update_size_value(e.target.value)
size_slider.onchange = (e) => change_size(e.target.value)

let mouse_down = false
document.body.onmousedown = () => (mouse_down = true)
document.body.onmouseup = () => (mouse_down = false)

function change_size(size) 
{
    update_size_value(size)
    set_current_size(size)
    reload_grid()
}

function update_size_value(size) 
{
    size_value.textContent = `${size} x ${size}`
}

function reload_grid()
{
    clear_grid()
    setup_grid(current_size)
}

function clear_grid()
{
    grid.innerHTML = ''
}

function setup_grid(size) 
{
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++)
    {
        const grid_element = document.createElement('div')
        grid_element.classList.add('grid_element')
        grid_element.addEventListener('mouseover', change_color)
        grid_element.addEventListener('mousedown', change_color)
        grid.appendChild(grid_element)
    }
}

function change_color(e)
{
    if (e.type === 'mouseover' && !mouse_down) return

    if (current_mode === 'rainbow')
    {
        const random_red = Math.floor(Math.random() * 256)
        const random_green = Math.floor(Math.random() * 256)
        const random_blue = Math.floor(Math.random() * 256)

        e.target.style.background = `rgb(${random_red}, ${random_green}, ${random_blue})`
    }

    else if (current_mode === 'color')
    {
        e.target.style.background = current_color
    }

    else if (current_mode === 'eraser')
    {
        e.target.style.background = '#fefefe'
    }
}

function activate_button(new_mode)
{
    if (current_mode === 'rainbow')
    {
        rainbow_button.classList.remove('active')
    }

    else if (current_mode === 'color')
    {
        color_button.classList.remove('active')
    }

    else if (current_mode === 'eraser')
    {
        eraser_button.classList.remove('active')
    }

    if (new_mode === 'rainbow')
    {
        rainbow_button.classList.add('active')
    }

    else if (new_mode === 'color')
    {
        color_button.classList.add('active')
    }

    else if (new_mode === 'eraser')
    {
        eraser_button.classList.add('active')
    }
}

window.onload = () => {
    setup_grid(DEFAULT_SIZE)
    activate_button(DEFAULT_MODE)
}