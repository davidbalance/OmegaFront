class ApiClientError extends Error {

    public readonly status: number;
    public readonly url: string;

    constructor(
        public readonly method: string,
        data: { status: number, url: string },
        message?: string
    ) {
        super(message ? `(${data.status}) ${message}` : `(${data.status}) Failed to ${method}: ${data.url}`);
        this.status = data.status;
        this.url = data.url;
    }

    public updateMessage(value: string): void {
        this.message = value;
    }
}

export default ApiClientError;