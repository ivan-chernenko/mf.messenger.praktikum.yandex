import { ProfileApi } from '../../api/profile-api';
import {
    ChangePasswordRequest,
    ChangeProfileRequest,
} from '../../api/profile-api';

export class ProfileController {
    constructor(private readonly profileApi: ProfileApi) {}

    getProfile() {
        return this.profileApi.getProfile();
    }

    changeProfile(data: ChangeProfileRequest) {
        return this.profileApi.changeProfile(data);
    }

    changePassword(data: ChangePasswordRequest) {
        return this.profileApi.changePassword(data);
    }

    changeAvatar(data: FormData) {
        return this.profileApi.changeAvatar(data);
    }
}
