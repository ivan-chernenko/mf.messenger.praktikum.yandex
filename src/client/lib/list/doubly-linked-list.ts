import {Node} from './types';
import {throwIfMoreThen} from "../error";

export class DoublyLinkedList<T> {
    size: number = 0;
    head?: Node<T> = null;
    tail?: Node<T> = null;

    private throwIfMoreThen = throwIfMoreThen('Index out of range');

    private initFirstNode = (node: Node<T>) => {
        this.head = node;
        this.tail = node;
        this.size++;
    };

    add(value: T, index?: number) {
        this.throwIfMoreThen(index, this.size);
        const node = createNode(value);
        if (this.size === 0)
            this.initFirstNode(node);
        else if (!Number.isInteger(index) || index === this.size)
            this.addInTail(node);
        else if (index === 0)
            this.addInHead(node);
        else {
            const currentNode = this.searchByIndex(index);
            this.addInMiddle(currentNode, node);
        }
    }

    removeByValue(value) {
        let currentNode = this.head;
        for (let i = 0; i < this.size; i++) {
            if (currentNode.value === value) {
                 if (i === this.size - 1)
                    this.removeTail();
                else if (i === 0)
                    this.removeHead();
                else
                    this.removeNode(currentNode);
                break;
            }
            currentNode = currentNode.next;
        }
    }

    removeByIndex(index) {
        this.throwIfMoreThen(index, this.size - 1);
        if (index === this.size - 1)
            this.removeTail();
        else if (index === 0)
            this.removeHead();
        else {
            const currentNode = this.searchByIndex(index);
            this.removeNode(currentNode);
        }
    }

    searchByIndex(index) {
        this.throwIfMoreThen(index, this.size - 1);
        let currentNode = this.head;
        for (let i = 0; i < index; i++)
            currentNode = currentNode.next;
        return currentNode;
    }

    searchByValue(value, startIndex = 0) {
        let currentNode = this.head;
        for (let i = startIndex; i < this.size; i++) {
            if (currentNode.value === value)
                return currentNode;
            currentNode = currentNode.next;
        }
        return null;
    }

    private addInHead = (node: Node<T>) => {
        this.head.prev = node;
        node.next = this.head;
        this.head = node;
        this.size++;
    };

    private addInTail = (node: Node<T>) => {
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
        this.size++;
    };

    private addInMiddle = (currentNode: Node<T>, node: Node<T>) => {
        node.next = currentNode;
        node.prev = currentNode.prev;
        currentNode.prev.next = node;
        currentNode.prev = node;
        this.size++;
    };

    private removeHead = () => {
        if (this.head.next === null)
            this.removeLastNode();
        else {
            this.head = this.head.next;
            this.head.prev = null;
        }
        this.size--;
    };

    private removeTail = () => {
        if (this.tail.prev === null)
            this.removeLastNode();
        else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
        this.size--;
    };

    private removeLastNode = () => {
        this.head = null;
        this.tail = null;
    };

    private removeNode = (currentNode: Node<T>) => {
        currentNode.prev.next = currentNode.next;
        currentNode.next.prev = currentNode.prev;
        this.size--;
    };

    [Symbol.iterator] = function* () {
        let currentNode = this.head;
        for (let i = 0; i < this.size; i++) {
            yield [currentNode, i];
            currentNode = currentNode.next;
        }
        yield [this.tail, this.size - 1];
    }
}

function createNode<T>(value: T): Node<T> {
    return {
        value,
        next: null,
        prev: null,
    };
}