import { HTTPTransport } from '../../lib/http-transport';
import { LoginData, RegisterData } from './types';

export class LoginApi {
    private readonly headers = {
        'Content-Type': 'application/json;charset=UTF-8',
    };

    constructor(private readonly http: HTTPTransport) {}

    login(data: LoginData) {
        return this.http.post('auth/signin', {
            data,
            headers: this.headers,
        });
    }

    logOut() {
        return this.http.post('auth/logout');
    }

    register(data: RegisterData) {
        return this.http.post('auth/signup', {
            data,
            headers: this.headers,
        });
    }
}
