export type Response =  {
    json(param: {message: string, data?: object | [] | null}): void;
    status(number: number): any;
}