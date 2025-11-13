import {Toolbox} from "./toolbox.js";
import {Card} from "./card.js";

let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d");

let toolbox = new Toolbox();
let cards = [];

for(let i = 0; i < 6; i++){
    cards.push(new Card(canvas, pencil, toolbox));
}

function gameLoop(){
    pencil.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < cards.length; i++){
        cards[i].drawCards();
    }
}

setInterval(gameLoop, 1000);

//canvas.addEventListener("click", cards[0].detectCardClick());