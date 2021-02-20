export interface LoginData {
    login: string;
    password: string;
}

export interface RegisterData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export interface ApiError {
    reason: string;
}