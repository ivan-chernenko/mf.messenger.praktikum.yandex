export class EventBus {
    private readonly listeners: {
        [key: string]: ((...args: unknown[]) => void)[];
    };

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: (...args: unknown[]) => void) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    off(event: string, callback: (...args: unknown[]) => void) {
        this.listeners[event] = this.listeners[event].filter(
            cb => cb !== callback,
        );
    }

    emit(event: string, ...args: unknown[]) {
        this.listeners[event].forEach(listener => listener(...args));
    }
}
