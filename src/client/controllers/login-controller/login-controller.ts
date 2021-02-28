import { LoginApi, LoginData, RegisterData } from '../../api/login-api';

export class LoginController {
    constructor(private readonly loginApi: LoginApi) {}

    login(data: LoginData) {
        return this.loginApi.login(data);
    }

    register(data: RegisterData) {
        return this.loginApi.register(data);
    }

    logout() {
        return this.loginApi.logOut();
    }
}
