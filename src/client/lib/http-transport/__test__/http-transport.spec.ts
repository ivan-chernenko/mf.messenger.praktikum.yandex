import {HTTPTransport} from "../http-transport";
import {Methods} from "../types";
import {expect} from 'chai';

describe('http-transport', () => {
    it('should return promise', () => {
       const http = new HTTPTransport();
       const request = http.post('http://localhost', {
           headers: {'Content-Type': 'application/json'},
           method: Methods.GET,
           timeout: 0,
       });
       expect(request).instanceof(Promise);
    });
});