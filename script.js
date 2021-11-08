const canvas = document.getElementById('canvas1')
const context = canvas.getContext('2d') 
// ^^canvas dostane všechny možné metody a nastavení, které je pak možné využít
// dále už se přistupuje jen k této proměnné, protože obsahuje ty metody, canvas jako takový tyto metody neobsahuje
// zavoláním console.logu na context si můžeme všechny metody a nastavení v konzoli zobrazit

canvas.width = window.innerWidth
canvas.height = window.innerHeight
const particlesArray = [];

console.log(context)

//vyřeší to, že canvas se změnou velikosti okna mění velikost a smaže obsah -> přizpůsobí velikost 
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

const mouse = {
    x: undefined,
    y: undefined,
}

//štětec: se zapnutou funkcí drawCircle
canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    
    for(i = 0; i < 10; i++){
    particlesArray.push(new Particle())
    }
    //drawCircle()
    
})

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    //drawCircle()
})
//

/*
function drawCircle() {
    context.fillStyle = 'red';
    context.beginPath()
    context.arc(mouse.x, mouse.y, 50, 0, Math.PI *2);
    context.fill()
}
*/
 
// vytvoří class, která bude generovat částice o náhodném průměru a náhodně se pohybující
class Particle {
    constructor(){
        this.x = mouse.x
        this.y = mouse.y
        //this.x = Math.random() * canvas.width
        //this.y = Math.random() * canvas.height
        this.size = Math.random() * 16 + 1;
        this.speedX = Math.random() * 3 - 1;
        this.speedY = Math.random() * 3 - 1;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        //částice se zmenšují
        if (this.size > 0.2) this.size -= 0.1
    }
    draw(){
        context.fillStyle = 'salmon';
        context.beginPath()
        context.arc(this.x, this.y, this.size, 0, Math.PI *2);
        context.fill()
    }
}

/*
function createParticles(){
    for (let i = 0; i < 100; i++){
        particlesArray.push(new Particle())
    }
}
createParticles()
*/

console.log(particlesArray)

function handleParticles(){
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        //vyhodí malé částice
        if (particlesArray[i].size <= 0.3){
            particlesArray.splice(i, 1)
            i--
        }
    }
}

function animate(){
    context.clearRect(0, 0, canvas.width, canvas.height) //vyčistí předešlou kresbu
    //drawCircle()
    handleParticles()
    requestAnimationFrame(animate) //zavolá samo sebe -> animační smyčka
}
animate()



