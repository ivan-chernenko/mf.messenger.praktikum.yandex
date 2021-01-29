import {DoublyLinkedList} from "../doubly-linked-list";
import {prepareList} from "./prepare-list";

describe('should add node in all places', () => {
    test('should add first node', () => {
        const list = new DoublyLinkedList();
        list.add(0);
        expect(list.head).toEqual(list.tail);
        expect(list.head.next).toEqual(null);
        expect(list.head.prev).toEqual(null);
        expect(list.head.value).toEqual(0);
        expect(list.size).toEqual(1);
    });

    test('should add node by index in head', () => {
        const list = new DoublyLinkedList();
        const expectedValues = [0, 1];
        list.add(1);
        list.add(0, 0);
        for (let [node, index] of list)
            expect(node.value).toEqual(expectedValues[index]);
        expect(list.tail.value).toEqual(1);
        expect(list.head.value).toEqual(0);
        expect(list.size).toEqual(2);
    });

    test('should add node by index in tail', () => {
        const list = new DoublyLinkedList();
        const expectedValues = [0, 1, 2];
        list.add(0);
        list.add(1);
        list.add(2, 2);
        for (let [node, index] of list)
            expect(node.value).toEqual(expectedValues[index]);
        expect(list.tail.value).toEqual(2);
        expect(list.head.value).toEqual(0);
        expect(list.size).toEqual(3);
    });

    test('should add node by index in middle', () => {
        const list = new DoublyLinkedList();
        const expectedValues = [0, 1, 2, 3];
        list.add(0);
        list.add(1);
        list.add(3);
        list.add(2, 2);
        for (let [node, index] of list)
            expect(node.value).toEqual(expectedValues[index]);
        expect(list.tail.value).toEqual(3);
        expect(list.head.value).toEqual(0);
        expect(list.size).toEqual(4);

    });

    test('should throw if index out of list range', () => {
        const list = new DoublyLinkedList();
        expect(() => list.add(0, 1)).toThrow('Index out of range');
    })
});

describe('should remove node from all places by index', () => {
    test('should remove node by index from head', () => {
        const list = prepareList();
        list.removeByIndex(0);
        const expectedValues = [1, 2, 3, 4, 5, 6];
        for (let [node, index] of list)
            expect(node.value).toEqual(expectedValues[index]);
        expect(list.tail.value).toEqual(6);
        expect(list.head.value).toEqual(1);
        expect(list.size).toEqual(6);

    });

    test('should remove node by index from tail', () => {
        const list = prepareList();
        list.removeByIndex(6);
        const expectedValues = [0, 1, 2, 3, 4, 5];
        for (let [node, index] of list)
            expect(node.value).toEqual(expectedValues[index]);
        expect(list.tail.value).toEqual(5);
        expect(list.head.value).toEqual(0);
        expect(list.size).toEqual(6);

    });

    test('should remove node by index from middle', () => {
        const list = prepareList();
        list.removeByIndex(3);
        const expectedValues = [0, 1, 2, 4, 5, 6];
        for (let [node, index] of list)
            expect(node.value).toEqual(expectedValues[index]);
        expect(list.tail.value).toEqual(6);
        expect(list.head.value).toEqual(0);
        expect(list.size).toEqual(6);

    });

    test('should throw if index out of range', () => {
        const list = new DoublyLinkedList();
        list.add(0);
        expect(() => list.removeByIndex(1)).toThrow('Index out of range');
    });

    test('should remove last node by index', () => {
        const list = new DoublyLinkedList();
        list.add(0);
        list.removeByIndex(0);
        expect(list.tail).toEqual(null);
        expect(list.head).toEqual(null);
    });
});

describe('should remove node from all places by value', () => {
    test('should remove node by value from head', () => {
        const list = prepareList();
        list.removeByValue(0);
        const expectedValues = [1, 2, 3, 4, 5, 6];
        for (let [node, index] of list)
            expect(node.value).toEqual(expectedValues[index]);
        expect(list.tail.value).toEqual(6);
        expect(list.head.value).toEqual(1);
        expect(list.size).toEqual(6);
    });

    test('should remove node by value from tail', () => {
        const list = prepareList();
        list.removeByValue(6);
        const expectedValues = [0, 1, 2, 3, 4, 5];
        for (let [node, index] of list)
            expect(node.value).toEqual(expectedValues[index]);
        expect(list.tail.value).toEqual(5);
        expect(list.head.value).toEqual(0);
        expect(list.size).toEqual(6);

    });

    test('should remove node by value from middle', () => {
        const list = prepareList();
        list.removeByValue(3);
        const expectedValues = [0, 1, 2, 4, 5, 6];
        for (let [node, index] of list)
            expect(node.value).toEqual(expectedValues[index]);
        expect(list.tail.value).toEqual(6);
        expect(list.head.value).toEqual(0);
        expect(list.size).toEqual(6);

    });

    test('should remove by value from empty list', () => {
        const list = new DoublyLinkedList();
        list.removeByValue(100);
        expect(list.tail).toEqual(null);
        expect(list.head).toEqual(null);
        expect(list.size).toEqual(0);

    });

    test('should remove last node by value', () => {
        const list = new DoublyLinkedList();
        list.add(0);
        list.removeByValue(0);
        expect(list.tail).toEqual(null);
        expect(list.head).toEqual(null);
        expect(list.size).toEqual(0);

    });
});

describe('should search node from all places by index', () => {
    test('should search by index in head', () => {
        const list = prepareList();
        const node = list.searchByIndex(0);
        expect(node.value).toEqual(0);
    });

    test('should search by index in tail', () => {
        const list = prepareList();
        const node = list.searchByIndex(6);
        expect(node.value).toEqual(6);
    });

    test('should search by index in middle', () => {
        const list = prepareList();
        const node = list.searchByIndex(4);
        expect(node.value).toEqual(4);
    });

    test('should throw if index out of range', () => {
        const list = new DoublyLinkedList();
        expect(() => list.searchByIndex(1)).toThrow('Index out of range');
    });
});

describe('should search node from all places by value', () => {
    test('should search by value in head', () => {
        const list = prepareList();
        const node = list.searchByValue(0);
        expect(node.value).toEqual(0);
    });

    test('should search by value in tail', () => {
        const list = prepareList();
        const node = list.searchByValue(6);
        expect(node.value).toEqual(6);
    });

    test('should search by value in middle', () => {
        const list = prepareList();
        const node = list.searchByValue(4);
        expect(node.value).toEqual(4);
    });
});