const canvas = document.getElementById('canvas1')
const context = canvas.getContext('2d') 


canvas.width = window.innerWidth
canvas.height = window.innerHeight
const particlesArray = [];

console.log(context)

//no shrinking 
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

const mouse = {
    x: undefined,
    y: undefined,
}

//interaction listeners
canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for(i = 0; i < 10; i++){
        particlesArray.push(new Particle())
        }
   
})
//
 
class Particle {
    constructor(){
        this.x = mouse.x
        this.y = mouse.y
        this.size = Math.random() * 16 + 1;
        this.speedX = Math.random() * 3 - 1;
        this.speedY = Math.random() * 3 - 1;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        // particles shrink
        if (this.size > 0.2) this.size -= 0.1
    }
    draw(){
        context.fillStyle = 'salmon';
        context.beginPath()
        context.arc(this.x, this.y, this.size, 0, Math.PI *2);
        context.fill()
    }
}

console.log(particlesArray)

function handleParticles(){
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        // remove too small particles
        if (particlesArray[i].size <= 0.3){
            particlesArray.splice(i, 1)
            i--
        }
    }
}

function animate(){
    context.clearRect(0, 0, canvas.width, canvas.height) //clean the precvious drawing
    handleParticles()
    requestAnimationFrame(animate) //calls itself -> animation loop
}
animate()



