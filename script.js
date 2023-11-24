
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const starsArray = [];
let hue = 0;

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined,
}

canvas.addEventListener('click', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 1; i++){
        starsArray.push(new Star());
    }   
});
canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 3; i++){
       starsArray.push(new Star());
    }
});

class Star {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 10 + 1;
        this.speedX = Math.random() * 2 - 1.5;
        this.speedY = Math.random() * 2 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)'; 
        }
        update(){
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.1;
        }
        draw(){
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 3);
            ctx.fill();
        }
}

function handleStars() {
    for (let i = 0; i < starsArray.length; i++){
        starsArray[i].update();
        starsArray[i].draw();
        for (let j = i; j < starsArray.length; j++) {
            const dx = starsArray[i].x - starsArray[j].x;
            const dy = starsArray[i].y - starsArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 50) {
                ctx.beginPath();
                ctx.moveTo(starsArray[i].x, starsArray[i].y);
                ctx.lineTo(starsArray[j].x, starsArray[j].y);
                ctx.stroke();
            }
            
        }
        if (starsArray[i].size <= 0.5) {
            starsArray.splice(i, 1);
            i--;
        }
    }   

}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleStars();
    hue+= 2;
    requestAnimationFrame(animate);
}
animate(); 