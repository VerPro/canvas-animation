const canvas = document.getElementById('canvas1')
const context = canvas.getContext('2d') 


canvas.width = window.innerWidth
canvas.height = window.innerHeight
const particlesArray = [];
let hue = 0;

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
    for(i = 0; i < 6; i++){
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
        this.color = 'hsl(' + hue + ', 100%, 50%)'
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        // particles shrink
        if (this.size > 0.2) this.size -= 0.1
    }
    draw(){
        context.fillStyle = this.color ;
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
        //constelation effect
        for (let j = i; j < particlesArray.length; j++){
           // distance between particles on X axis
            const dx = particlesArray[i].x - particlesArray[j].x
            // distance between particles on Y axis
            const dy = particlesArray[i].y - particlesArray[j].y
            // distance between particles = (dx^2 + dy^2)^1/2 (Pythagorean theorem)
            const distance = Math.sqrt(dx*dx + dy*dy)

            if (distance < 100){
                context.beginPath();
                context.strokeStyle = particlesArray[i].color
                context.lineWidth = 0.2
                context.moveTo(particlesArray[i].x, particlesArray[i].y);
                context.lineTo(particlesArray[j].x, particlesArray[j].y)
                context.stroke()
            }
        }
        //


        // remove too small particles
        if (particlesArray[i].size <= 0.3){
            particlesArray.splice(i, 1)
            i--
        }
    }
}

function animate(){

    context.clearRect (0, 0, canvas.width, canvas.height)
    hue +=5
    handleParticles()
    requestAnimationFrame(animate) //calls itself -> animation loop
}
animate()



