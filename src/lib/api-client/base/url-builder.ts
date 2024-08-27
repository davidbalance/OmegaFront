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

        Object.entries(this._urlParams).forEach(([key, value]) => {
            url = url.replace(`:${key}`, value.toString());
        });

        const query: URLSearchParams = new URLSearchParams();
        Object.entries(this._queryParams).forEach(([key, value]) => {
            query.append(key, value.toString());
        });
        const queryString: string = query.toString();
        if (queryString) {
            url += `?${queryString}`;
        }

        return url;
    }
}

export default UrlBuilder;