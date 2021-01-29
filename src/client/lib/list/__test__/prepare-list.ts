import {DoublyLinkedList} from "../doubly-linked-list";

export const prepareList = () => {
    const list = new DoublyLinkedList();
    list.add(0);
    list.add(1);
    list.add(2);
    list.add(3);
    list.add(4);
    list.add(5);
    list.add(6);
    return list;
};