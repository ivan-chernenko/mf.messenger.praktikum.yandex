import { HTTPTransport } from '../../lib/http-transport';
import {
    ChangePasswordRequest,
    ChangeProfileRequest,
    ChangeProfileResponse,
    GetProfileResponse,
} from './types';

export class ProfileApi {
    private readonly baseUrl = 'https://ya-praktikum.tech/api/v2';
    private readonly headersJson = {
        'Content-Type': 'application/json;charset=UTF-8',
    };

    constructor(private readonly http: HTTPTransport) {}

    getProfile() {
        const url = `${this.baseUrl}/auth/user`;
        return this.http.get<GetProfileResponse>(url);
    }

    changeProfile(data: ChangeProfileRequest) {
        const url = `${this.baseUrl}/user/profile`;
        return this.http.put<ChangeProfileResponse>(url, {
            data,
            headers: this.headersJson,
        });
    }

    changeAvatar(data: FormData) {
        const url = `${this.baseUrl}/user/profile/avatar`;
        return this.http.put<GetProfileResponse>(url, {
            data,
        });
    }

    changePassword(data: ChangePasswordRequest) {
        const url = `${this.baseUrl}/user/password`;
        return this.http.put(url, {
            headers: this.headersJson,
            data,
        });
    }
}
