export enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export interface Options<Data = unknown> {
    method: Methods;
    data?: Data;
    timeout?: number;
    headers?: {[key: string]: string};
}

export type OptionsWithoutMethod = Omit<Options, 'method'>;