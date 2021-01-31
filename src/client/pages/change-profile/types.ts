import {Input} from '../../components/input/index.js';
import {Button} from '../../components/button/index.js';

export interface ChangeProfilePageProps {
    email: Input;
    firstName: Input;
    login: Input;
    lastName: Input;
    displayName: Input;
    phone: Input;
    button: Button;
}