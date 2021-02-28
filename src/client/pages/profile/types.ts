import { ProfileController } from '../../controllers/profile-controller';
import { LoginController } from '../../controllers/login-controller';

export interface ProfilePageProps {
    profileController: ProfileController;
    loginController: LoginController;
}
