import {Button} from '../../components/button/index.js';
import {Input} from '../../components/input/input';

export interface ChangePasswordProps {
    button: Button;
    newPassword: Input;
    oldPassword: Input;
    repeatPassword: Input;
}