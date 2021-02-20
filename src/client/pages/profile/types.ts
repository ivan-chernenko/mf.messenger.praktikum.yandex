import {ProfileController} from '../../controllers/profile-controller/index';
import {LoginController} from '../../controllers/login-controller/index';

export interface ProfilePageProps {
    profileController: ProfileController;
    loginController: LoginController;
}