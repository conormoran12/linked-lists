export default class LinkedList {

    head = null;

    listSize = 0;
    lastNode = null;

    get tail() {
        return this.lastNode;
    }

    set tail(node) {
        this.lastNode = node;
    }

    get size() {
        return this.listSize;
    }

    set size(value) {
        this.listSize = value;
    }

    append(value) {
        if (value == null || value == undefined) return;
        const newNode = new NewNode(value);
        if (this.head == null) this.head = newNode;
        if (this.tail == null) {
            this.tail = newNode;
        } else {
            this.tail.nextNode = newNode;
            this.tail = newNode;
        }
        this.size = this.size + 1;
    }

    prepend(value) {
        if (value == null || value == undefined) return;
        const newNode = new NewNode(value);
        newNode.nextNode = this.head;
        this.head = newNode;
        this.size = this.size + 1;
    }

    contains(value, node = this.head) {
        if (node.value == value) {
            return true;
        } else {
            if (node.nextNode != undefined) {
                return this.contains(value, node.nextNode);
            }
            return false;
        }
    }

    at(index, node = this.head) {
        if (node == null) return null;
        if (node.nextNode && index != 0) {
            index--;
            return this.at(index, node.nextNode);
        } else if (index == 0) {
            return node;
        } else {
            return null;
        }
    }

    find(value, node = this.head, index = 0) {
        if (node.value == value) {
            return index;
        } else if (node.value != value) {
            index += 1;
            return this.find(value, node.nextNode, index);
        }
    }

    pop() {
        if (this.size < 1) return;
        const previousNodeIndex = this.find(this.tail.value) - 1;
        if (this.head == this.tail) {
            this.head = null;
            this.tail = null;
            this.size = this.size - 1;
            return;
        }
        const previousNode = this.at(previousNodeIndex);
        previousNode.nextNode = null;
        this.tail = previousNode;
        this.size = this.size - 1;
    }

    toString(node = this.head, string = ``) {
        if (node == null) return `null`;
        if (node.nextNode) {
            string = string.concat(`( ${node.value} ) -> `);
            return this.toString(node.nextNode, string);
        } else {
            string = string.concat(`( ${node.value} ) -> null`);
        }
        return string;
    }

    insertAt(value, index) {
        if (index < 0 || index > this.size) return;
        if (index == 0) {
            const newNode = new NewNode(value, this.head);
            this.head = newNode;
        }
        else if (index == this.size) {
            const newNode = new NewNode(value, null);
            this.tail.nextNode = newNode;
            this.tail = newNode;
        }
        else {
            const newNode = new NewNode(value, this.at(index + 1));
            this.at(index - 1).nextNode = newNode;
        }
        this.size = this.size + 1;
    }

    removeAt(index) {
        if (index < 0 || index >= this.size) return;
        if (index == 0) {
            if (this.head == this.tail) {
                this.head = null;
                this.tail = null;
                this.size = this.size - 1;
                return;
            }
            this.head = this.head.nextNode;
            this.size = this.size - 1;
            return;
        }
        else if (index == this.size - 1) {
            this.tail = null;
            this.tail = this.at(index - 1);
            this.tail.nextNode = null;
            this.size = this.size - 1;
            return;
        }
        this.at(index - 1).nextNode = this.at(index + 1);
        this.size = this.size - 1;
    }
}

class NewNode {

    constructor(value, nextNode) {
        this.value = value;
        this.nextNode = nextNode;
    }
}