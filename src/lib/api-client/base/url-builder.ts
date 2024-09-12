class UrlBuilder {
    public static builder(url: string): UrlBuilder {
        return new UrlBuilder(url);
    }

    private _urlParams: Record<string, string | number> = {};
    private _queryParams: Record<string, string | number | boolean> = {};

    constructor(private readonly _url: string) { }

    public query(params: Record<string, string | number | boolean> | undefined): UrlBuilder {
        if (params) this._queryParams = params;
        return this;
    }

    public param(params: Record<string, string | number> | undefined): UrlBuilder {
        if (params) this._urlParams = params;
        return this;
    }

    public build(): string {
        let url: string = this._url;

        const segments = this.extractSegments(url);
        for (const segment of segments) {
            if (!(segment in this._urlParams)) {
                throw new Error(`Missing URL param: ${segment}`);
            }
        }

        Object.entries(this._urlParams).forEach(([key, value]) => {
            if (value) {
                url = url.replace(`:${key}`, value.toString());
            }
        });

        const query: URLSearchParams = new URLSearchParams();
        Object.entries(this._queryParams).forEach(([key, value]) => {
            if (value !== undefined) {
                query.append(key, value.toString());
            }
        });
        const queryString: string = query.toString();
        if (queryString) {
            url += `?${queryString}`;
        }

        return url;
    }

    private extractSegments(url: string): string[] {
        const segments: string[] = url.split('/');

        return segments
            .filter(e => e.startsWith(':'))
            .map(e => e.slice(1));
    }
}

export default UrlBuilder;