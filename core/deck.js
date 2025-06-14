import {Card} from "./card.js";
import {LinkedList} from "./linkedlist.js";

export class Deck {

    constructor() {
        this.suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        this.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        this.cards = new LinkedList();

        for (const suit of this.suits) {
            for (const rank of this.ranks) {
                this.cards.push(new Card(rank, suit));
            }
        }
    }

    shuffle(){
        this.cards.shuffle();
    }

}
