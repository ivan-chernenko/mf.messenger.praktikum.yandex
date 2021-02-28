import { HTTPTransport } from '../http-transport';
import { expect } from 'chai';

describe('http-transport', () => {
    it('should return promise', () => {
        const http = new HTTPTransport();
        const request = http.get('http://localhost', {
            headers: { 'Content-Type': 'application/json' },
            timeout: 0,
        });
        expect(request).instanceof(Promise);
    });
});
