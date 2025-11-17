import { Toolbox } from "./toolbox.js";

export class Card{
    x = 100;
    y = 100;
    color;
    width = 150;
    height = 200;
    canvas;
    pencil;
    isFaceUp = false; 
    toolbox = new Toolbox();

    constructor(canvas, pencil, x, y, color, card) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.pencil = pencil;
        this.canvas = canvas;
        this.card = card;
        canvas.addEventListener("click", (e) => this.onClick(e));
    }

    draw() {
        if(this.isFaceUp) {
            this.pencil.fillStyle = this.color; // Set the fill color
            this.pencil.fillRect(this.x, this.y, this.width, this.height); // Draw a filled rectangle at (50, 50) with width 100 and height 75
        } else { //draw face down
            this.pencil.drawImage(this.card, this.x, this.y, this.width, this.height);
        }
    }

     onClick(event) {
        let clickX = event.offsetX;
        let clickY = event.offsetY;

        let isClickInButton = this.toolbox.isWithinRect(
            clickX, clickY, this.x, this.y, this.width, this.height
        );

        if(isClickInButton) {
            this.isFaceUp = !this.isFaceUp;
        }
    }
}