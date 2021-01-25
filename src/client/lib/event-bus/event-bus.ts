export class EventBus {
    private readonly listeners: { [key: string]: ((...args: any[]) => void)[] };

    constructor() {
        this.listeners = {};
    }

    on(event, callback) {
        if (this.listeners[event] === undefined)
            this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    off(event, callback) {
        this.listeners[event] = this.listeners[event].filter(cb => cb !== callback)
    }

    emit(event, ...args) {
        if (this.listeners[event] === undefined)
            throw new Error(`Нет события: ${event}`);
        this.listeners[event].forEach(listener => listener(...args));
    }
}