const canvas = document.getElementById('canvas1')
const context = canvas.getContext('2d') 
// ^^canvas dostane všechny možné metody a nastavení, které je pak možné využít
// dále už se přistupuje jen k této proměnné, protože obsahuje ty metody, canvas jako takový tyto metody neobsahuje
// zavoláním console.logu na context si můžeme všechny metody a nastavení v konzoli zobrazit

canvas.width = window.innerWidth
canvas.height = window.innerHeight

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
    //drawCircle()
})

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    //drawCircle()
})
//

function drawCircle() {
    context.fillStyle = 'red';
    context.beginPath()
    context.arc(mouse.x, mouse.y, 50, 0, Math.PI *2);
    context.fill()
}
   
function animate(){
    context.clearRect(0, 0, canvas.width, canvas.height) //vyčistí předešlou kresbu
    drawCircle()
    requestAnimationFrame(animate) //zavolá samo sebe -> animační smyčka
}
animate()



