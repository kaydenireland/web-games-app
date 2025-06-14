import { Card } from '../core/card.js';
import { Deck } from '../core/deck.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const deck = new Deck();
deck.shuffle();

let card = null; // currently dragged card
const wastePile = [];

const stockX = 1200 - 100 - 20;
const stockY = 20;

if (!deck.cards.isEmpty()) {
    const topCard = deck.cards.peek();
    topCard.x = stockX;
    topCard.y = stockY;
    topCard.faceUp = false;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw top card in deck
    if (!deck.cards.isEmpty()) {
        deck.cards.peek().draw(ctx);
    }


    // Draw all cards in the waste pile
    for (const c of wastePile) {
        c.draw(ctx);
    }

    // Draw currently dragged card on top
    if (card) {
        card.draw(ctx);
    }
}

canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // 🔽 First: check the currently drawn deck card
    const topCard = deck.cards.peek();
    if (
        topCard &&
        mouseX >= topCard.x &&
        mouseX <= topCard.x + topCard.width &&
        mouseY >= topCard.y &&
        mouseY <= topCard.y + topCard.height
    ) {
        card = deck.cards.pop();
        card.flip();
        card.isDragging = true;
        card.offsetX = mouseX - card.x;
        card.offsetY = mouseY - card.y;

        // Update deck display
        const newTop = deck.cards.peek();
        if (newTop) {
            newTop.x = stockX;
            newTop.y = stockY;
            newTop.faceUp = false;
        }

        draw();
        return;
    }

    // 🔽 Then: check wastePile, from top to bottom (reverse order)
    for (let i = wastePile.length - 1; i >= 0; i--) {
        const c = wastePile[i];
        if (c.isUnderMouse(mouseX, mouseY)) {
            card = c;
            card.isDragging = true;
            card.offsetX = mouseX - card.x;
            card.offsetY = mouseY - card.y;

            // 🔄 Move it to the end of wastePile so it draws on top
            wastePile.splice(i, 1);     // remove from current index
            wastePile.push(card);       // push to top of z-index

            draw();
            return;
        }
    }
});


canvas.addEventListener('mousemove', (e) => {
    if (card && card.isDragging) {
        const rect = canvas.getBoundingClientRect();
        card.x = e.clientX - rect.left - card.offsetX;
        card.y = e.clientY - rect.top - card.offsetY;
        draw();
    }
});

canvas.addEventListener('mouseup', () => {
    if (card) {
        card.isDragging = false;
        wastePile.push(card);
        draw();
    }
});

canvas.addEventListener('mouseleave', () => {
    if (card) {
        card.isDragging = false;
        draw();
    }
});

draw();
