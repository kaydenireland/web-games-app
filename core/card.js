export class Card {
    constructor(rank, suit, x = 0, y = 0) {
        this.rank = rank;
        this.suit = suit;

        this.x = x;
        this.y = y;
        this.offsetX = 0;
        this.offsetY = 0;

        this.height = 145;
        this.width = 100;

        this.isDragging = false;
        this.faceUp = false;


        // TODO Better Image Naming System

        this.frontImage = new Image();
        this.frontImage.src = '/assets/cards/' + rank + suit +'.png';

        this.backImage = new Image();
        this.backImage.src = '/assets/cards/back.png';

    }

    toString() {
        return this.rank + " of " + this.suit;
    }

    draw(ctx) {
        const image = this.faceUp ? this.frontImage : this.backImage;

        if (image.complete) {
            ctx.drawImage(image, this.x, this.y, this.width, this.height);
        } else {
            image.onload = () => {
                ctx.drawImage(image, this.x, this.y, this.width, this.height);
            };
        }
    }

    isUnderMouse(mx, my) {
        return mx >= this.x &&
            mx <= this.x + this.width &&
            my >= this.y &&
            my <= this.y + this.height;
    }

    flip(){
        this.faceUp = !this.faceUp;
    }
}