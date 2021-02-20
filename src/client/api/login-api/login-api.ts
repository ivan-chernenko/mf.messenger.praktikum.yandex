import {HTTPTransport} from '../../lib/http-transport/index';
import {LoginData, RegisterData} from "./types";

export class LoginApi {
    private readonly baseUrl = 'https://ya-praktikum.tech/api/v2/auth';
    private readonly headers = {
        'Content-Type': 'application/json;charset=UTF-8',
    };

    constructor(private readonly http: HTTPTransport) {
    }

    login(data: LoginData) {
        const url = `${this.baseUrl}/signin`;
        return this.http.post(url, {
            data,
            headers: this.headers,
        })
    }

    logOut() {
        const url = `${this.baseUrl}/logout`;
        return this.http.post(url);
    }

    register(data: RegisterData) {
        const url = `${this.baseUrl}/signup`;
        return this.http.post(url, {
            data,
            headers: this.headers,
        });
    }
}