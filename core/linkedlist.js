class Node{
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

export class LinkedList{
    constructor(){
        this.head = null;
        this.numItems = 0;
    }

    push(value){
        this.numItems++;
        let next = new Node(value)
        if(!this.head){
            this.head = next;
            return;
        }
        this.getLast().next = next;
    }

    pop(){
        let popped = this.head;
        this.head = this.head.next;
        this.numItems--;
        return popped.value;
    }

    getFirst(){
        return this.head;
    }

    getLast(){
        let current = this.head;
        while(current.next){
            current = current.next;
        }
        return current;
    }

    getList(){
        let current = this.head;
        let list = "";
        while(current){
            list += current.value;
            if(current.next){
                list += ", ";
            }
            current = current.next;
        }
        return list;
    }

    peek(){
        return this.head.value;
    }

    peekLast(){
        return this.getLast().value;
    }

    contains(value){
        if(!this.head){
            return "List is empty";
        }
        let current = this.head;
        while(current){
            if(current.value === value){
                return value += " was found";
            }
            current = current.next;
        }
        return value += " not found";
    }

    getLength(){
        return this.numItems;
    }

    isEmpty(){
        return !this.head;
    }

    // TODO: Add, Remove, Find Methods Using Index
    // Index starts at 0
    // TODO: Add, Remove Methods Using Values
    // TODO: Possible Double Linked List
}

//let list = new LinkedList();



