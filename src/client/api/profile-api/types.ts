export interface GetProfileResponse {
    id: number;
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
    display_name: string | null;
    avatar: string | null;
}

export interface ChangeProfileResponse {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
}

export interface ChangeProfileRequest {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export interface ChangeAvatarRequest {}
