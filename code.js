import { Card } from "./card.js";
import { Toolbox } from "./toolbox.js";

let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d"); // This gives you the drawing context, like a pencil
let cardBacking = document.getElementById("cardBack");
let victoryScreen = document.getElementById("victoryScreen");
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
let isChecking = false;

for(let i = 0; i < 6; i++){
    let selectedColor = colorOptions[0];
    colorOptions.splice(0, 1);
    cards.push(new Card (canvas, pencil, spacing, 50, selectedColor, cardBacking));
    spacing += 250;
}

function gameLoop() {
    pencil.clearRect(0,0, canvas.width, canvas.height);

    let faceUpCards = [];

    // 1. Draw cards and collect any face-up cards
    for (let i = 0; i < cards.length; i++) {
        cards[i].draw();
        if (cards[i].isFaceUp && cards[i].color !== "white") {
            faceUpCards.push(cards[i]);
        }
    }

    // 2. If exactly two cards are face-up, check them
    if (faceUpCards.length == 2 && !isChecking) {
        isChecking = true;

        // MATCH — Eliminates them both
        if (faceUpCards[0].color == faceUpCards[1].color) {
            let targetColor = faceUpCards[0].color;

            setTimeout(() => {
                for (let card of cards) {
                    if (card.color == targetColor) {
                        card.color = "white";
                    }
                }

                matches++;
                matchesElement.innerHTML = "MATCHES: " + matches;

                isChecking = false;
            }, 700);
        
        // NO MATCH — Flip them back
        } else {
           setTimeout(() => {
            faceUpCards[0].isFaceUp = false;
            faceUpCards[1].isFaceUp = false;

            isChecking = false;
        }, 700);
        }
    }

    if (matches == 3){
        pencil.clearRect(0,0, canvas.width, canvas.height);
        myCanvas.height = 900;
        pencil.drawImage(victoryScreen, 0, 0, canvas.width, canvas.height);
    }
}

setInterval(gameLoop, 50);