import { Card } from "./card.js";
import { Toolbox } from "./toolbox.js";

let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d"); // This gives you the drawing context, like a pencil
let toolbox = new Toolbox();

let colorOptions = [];

for (let i = 0; i < 3; i++){
        colorOptions.push(toolbox.getRandomColor());
    }
for (let i = 0; i < 3; i++){
        colorOptions.push(colorOptions[i])
    }
colorOptions = toolbox.shuffleArray(colorOptions);

let cards = [];
let spacing = 50;

for(let i = 0; i < 6; i++){
    let selectedColor = colorOptions[0];
    colorOptions.splice(0, 1);
    cards.push(new Card (canvas, pencil, spacing, 50, selectedColor));
    spacing += 150;
}


function gameLoop() {
    pencil.clearRect(0,0, canvas.width, canvas.height);

    for(let i = 0; i < cards.length; i++){
        cards[i].draw();
    }
}

setInterval(gameLoop, 50);