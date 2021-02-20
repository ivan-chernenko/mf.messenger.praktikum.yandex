import {Input} from "../../components/input/index";

export type Schema = {
    name: string,
    fn: (input: Input) => boolean,
}[];