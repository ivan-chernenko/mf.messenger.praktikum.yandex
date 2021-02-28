import { Input } from '../../components/input';

export type Schema = {
    name: string;
    fn: (input: Input) => boolean;
}[];
