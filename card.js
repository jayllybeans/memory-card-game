export class Card{
    x = 0;
    y = 100;
    width = 100;
    height = 100;
    colorOptions = [];
    isClicked = false;

    constructor(canvas, pencil, toolbox){
        this.canvas = canvas;
        this.pencil = pencil;
        this.toolbox = toolbox;
    }

    setCardColors(toolbox){
        for (let i = 0; i < 3; i++){
            this.colorOptions.push(toolbox.getRandomColor());
        }
        for(let i = 0; i < 3; i++){
            this.colorOptions.push(this.colorOptions[i]);
        }
        this.colorOptions = toolbox.shuffleArray(this.colorOptions);
    }

    drawCards(){
        this.canvas.addEventListener("click", this.detectCardClick());
        if (this.isClicked){
            this.pencil.fillStyle = Math.floor(Math.random() * this.colorOptions.length);
        }
        else{
            this.pencil.fillStyle = "black";
        }
        this.pencil.fillRect(this.x + 100, this.y, this.width, this.height);
    }

    //check if the user clicked on the card
    detectCardClick(){
        this.cardTopLeft = { 
            x : this.x,
            y : this.y - this.height
        }

        this.cardBottomRight = { 
            x : this.x + this.width,
            y : this.y - this.height + this.height
        }

        
        let isFarEnoughRight = this.x > this.cardTopLeft.x;
        let isLowEnough = this.y > this.cardTopLeft.y;
        let isFarEnoughLeft = this.x < this.cardBottomRight.x;
        let isHighEnough = this.y < this.cardBottomRight.y;

        if((isFarEnoughRight && isLowEnough && isFarEnoughLeft && isHighEnough))
            this.isClicked = true;
        this.isClicked = false;
    }
}