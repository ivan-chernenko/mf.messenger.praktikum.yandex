import { HTTPTransport } from '../../lib/http-transport';
import {
    ChangePasswordRequest,
    ChangeProfileRequest,
    ChangeProfileResponse,
    GetProfileResponse,
} from './types';

export class ProfileApi {
    private readonly headersJson = {
        'Content-Type': 'application/json;charset=UTF-8',
    };

    constructor(private readonly http: HTTPTransport) {}

    getProfile() {
        return this.http.get<GetProfileResponse>('auth/user');
    }

    changeProfile(data: ChangeProfileRequest) {
        return this.http.put<ChangeProfileResponse>('user/profile', {
            data,
            headers: this.headersJson,
        });
    }

    changeAvatar(data: FormData) {
        return this.http.put<GetProfileResponse>('user/profile/avatar', {
            data,
        });
    }

    changePassword(data: ChangePasswordRequest) {
        return this.http.put('user/password', {
            headers: this.headersJson,
            data,
        });
    }
}
