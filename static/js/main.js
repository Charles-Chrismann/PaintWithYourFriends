var socket = io();

let canvas = document.querySelector('#monaLisa')
let isDrawing;
let radius = 4;
let brushEl = document.querySelector('#brush')

window.addEventListener('wheel', (e) => {
    if (e.deltaY < 0) {
        radius += 4
    }
    else if (e.deltaY > 0) {
        radius -= 4
    }
    brushEl.style.width = `${radius}px`
})

canvas.addEventListener('mousemove', (e) => {
    brushEl.style.display = 'block'
    brushEl.style.top = `${e.clientY}px`
    brushEl.style.left = `${e.clientX}px`
    brushEl.style.width = `${radius}px`
    brushEl.style.background = document.querySelector('input[type="color"]').value
})

if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        socket.emit('draw', {
            x: x,
            y: y,
            clr: document.querySelector('input[type="color"]').value,
            radius: radius
        })
    })
    canvas.addEventListener('mousemove', (e) => {
        if(!isDrawing) return
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        socket.emit('draw', {
            x: x,
            y: y,
            clr: document.querySelector('input[type="color"]').value,
            radius: radius
        })
    })
    canvas.addEventListener('mouseup', (e) => {
        isDrawing = false;
    })

    canvas.addEventListener('mouseleave', (e) => {
        brushEl.style.display = 'none'
    })

  } else {
    // code pour le cas où canvas ne serait pas supporté
}

socket.on('draw', (msg) => {
    ctx.fillStyle = msg.clr
    // ctx.fillRect(msg.x - msg.radius/2, msg.y - msg.radius/2, msg.radius, msg.radius);
    ctx.beginPath();
    ctx.arc(msg.x, msg.y, msg.radius/2, 0, 2 * Math.PI);
    ctx.fill();
})