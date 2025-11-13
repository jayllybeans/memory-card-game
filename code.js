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
let matches = 0;
let matchesElement = document.getElementById("matchesDisplay");

for(let i = 0; i < 6; i++){
    let selectedColor = colorOptions[0];
    colorOptions.splice(0, 1);
    cards.push(new Card (canvas, pencil, spacing, 50, selectedColor));
    spacing += 150;
}

function gameLoop() {
    pencil.clearRect(0,0, canvas.width, canvas.height);

    let faceUpCards = [];
    if(cards.length == 0){

    }else{
        for(let i = 0; i < cards.length; i++){
        cards[i].draw();
        if (faceUpCards.length == 2){
            if (faceUpCards[0].color == faceUpCards[1].color){
                let removeInstanceOf = faceUpCards[0].color;
            for (let i = 0; i < 2; i++){
                faceUpCards.splice(0, 1);
            }
            for (let i = 0; i < cards.length; i++){
                if(removeInstanceOf == cards[i].color){
                    cards[i].color = "white";
                    i--;
                }
            matches++;
            matchesElement.innerHTML = "MATCHES: " + matches;
            }
            } else {
                for (let i = 0; i < 2; i++){
                    faceUpCards[0].isFaceUp = false;
                    faceUpCards.splice(0, 1);
                }
            }
        } else if (cards[i].isFaceUp){
            faceUpCards.push(cards[i]);
        }
    }
    }
}

setInterval(gameLoop, 50);