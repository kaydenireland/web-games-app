import { Card } from '../core/card.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const card = new Card('J', 'Diamonds', 100, 100);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    card.draw(ctx);
}

canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (card.isUnderMouse(mouseX, mouseY)) {
        if (!card.faceUp) {
            card.flip();
        } else {
            card.isDragging = true;
            card.offsetX = mouseX - card.x;
            card.offsetY = mouseY - card.y;
        }
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (card.isDragging) {
        const rect = canvas.getBoundingClientRect();
        card.x = e.clientX - rect.left - card.offsetX;
        card.y = e.clientY - rect.top - card.offsetY;
        draw();
    }
});

canvas.addEventListener('mouseup', () => {
    card.isDragging = false;
});

canvas.addEventListener('mouseleave', () => {
    card.isDragging = false;
});

draw();