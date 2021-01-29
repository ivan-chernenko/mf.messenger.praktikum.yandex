export interface Node<T> {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
}