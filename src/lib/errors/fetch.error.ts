export class FetchError extends Error {
    constructor(
        readonly response: Response,
        readonly message: string,
        readonly data: any) {
        super(message);
    }
}
