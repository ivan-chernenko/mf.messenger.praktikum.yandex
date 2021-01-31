import {Button} from '../../components/button';
import {Input} from '../../components/input';

export interface RegisterPageProps {
    button: Button;
    email: Input;
    firstName: Input;
    lastName: Input;
    password: Input;
    repeatPassword: Input;
    login: Input;
    phone: Input;
    emailValue: string;
}