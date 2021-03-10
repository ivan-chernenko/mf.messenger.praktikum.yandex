import { Methods, Options, OptionsWithoutMethod } from './types';
import { queryStringify } from './query-stringify';
import { PlainObject } from '../object-helpers';

export class HTTPTransport {
    static DEFAULT_TIMEOUT = 30000;

    constructor(private readonly baseUrl: string) {}

    private tryParseResponse = <ResponseType extends {}>(
        response: string,
    ): ResponseType => {
        try {
            if (response === 'OK') return {} as ResponseType;
            const parsedResponse = JSON.parse(response);
            return parsedResponse;
        } catch (err) {
            throw new Error("can't parse response");
        }
    };

    get<ResponseType = unknown>(
        url: string,
        options?: OptionsWithoutMethod,
    ): Promise<ResponseType> {
        return this.request(url, {
            ...options,
            method: Methods.GET,
        }).then(res => this.tryParseResponse<ResponseType>(res));
    }

    post<ResponseType = unknown>(
        url: string,
        options?: OptionsWithoutMethod,
    ): Promise<ResponseType> {
        return this.request(url, {
            ...options,
            method: Methods.POST,
        }).then(res => this.tryParseResponse<ResponseType>(res));
    }

    put<ResponseType = unknown>(
        url: string,
        options?: OptionsWithoutMethod,
    ): Promise<ResponseType> {
        return this.request(url, {
            ...options,
            method: Methods.PUT,
        }).then(res => this.tryParseResponse<ResponseType>(res));
    }

    delete<ResponseType = unknown>(
        url: string,
        options?: OptionsWithoutMethod,
    ): Promise<ResponseType> {
        return this.request(url, {
            ...options,
            method: Methods.DELETE,
        }).then(res => this.tryParseResponse<ResponseType>(res));
    }

    private setHeaders(xhr: XMLHttpRequest, options: Options) {
        if (options.headers !== undefined)
            Object.entries(options.headers).forEach(header =>
                xhr.setRequestHeader(header[0], header[1]),
            );
    }

    private open(xhr: XMLHttpRequest, url: string, options: Options) {
        if (options.method === Methods.GET && options.data !== undefined) {
            const urlWithStringQuery = queryStringify(
                options.data as PlainObject,
            );
            xhr.open(
                options.method,
                `${this.baseUrl}${url}${urlWithStringQuery}`,
            );
        } else {
            xhr.open(options.method, `${this.baseUrl}${url}`);
        }
    }

    private send(xhr: XMLHttpRequest, options: Options) {
        if (options.data === undefined || options.method === Methods.GET) {
            xhr.send();
        } else if (
            options.headers &&
            options.headers['Content-Type'].includes('application/json')
        ) {
            xhr.send(JSON.stringify(options.data));
        } else {
            xhr.send(options.data as FormData);
        }
    }

    private addListeners<ResponseType>(
        xhr: XMLHttpRequest,
        resolve: (value: ResponseType | PromiseLike<ResponseType>) => void,
        reject: (reason?: any) => void,
    ) {
        xhr.onload = () => {
            if (200 <= xhr.status && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                let response = xhr.response;
                if (typeof xhr.response === 'string') {
                    try {
                        response = JSON.parse(response);
                    } catch (err) {
                        console.log("can' parse string response from server");
                        response = xhr.response;
                    }
                }
                reject(response);
            }
        };
        xhr.onabort = () => reject(xhr.response);
        xhr.onerror = () => reject(xhr.response);
        xhr.ontimeout = () => reject(xhr.response);
    }

    private request(url: string, options: Options): Promise<string> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            this.open(xhr, url, options);
            xhr.withCredentials = true;
            this.setHeaders(xhr, options);
            this.addListeners(xhr, resolve, reject);
            xhr.timeout = options.timeout ?? HTTPTransport.DEFAULT_TIMEOUT;
            this.send(xhr, options);
        });
    }
}
