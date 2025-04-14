export type URLParams = Record<string, string | number>;
export type QueryParams = Record<string, string | number | boolean | object>;

interface UrlState {
    url: string;
    urlParams: URLParams;
    queryParams: QueryParams;
}

const extractSegments = (url: string): string[] => url
    .split('/')
    .filter(e => e.startsWith(':'))
    .map(e => e.slice(1));

const buildUrl = ({ url, queryParams, urlParams }: UrlState): string => {
    let finalUrl = url;

    const segments = extractSegments(url);
    for (const segment of segments) {
        if (!(segment in urlParams)) {
            throw new Error(`Missing URL param: ${segment}`);
        }
    }

    Object.entries(urlParams)
        .forEach(([key, value]) => {
            if (value && typeof value === 'object') {
                finalUrl = finalUrl.replace(`:${key}`, JSON.stringify(value));
            } else if (value) {
                finalUrl = finalUrl.replace(`:${key}`, value.toString());
            }
        });

    const query = new URLSearchParams();
    Object.entries(queryParams)
        .forEach(([key, value]) => {
            if (value !== undefined) {
                query.append(key, value.toString());
            }
        });
    const queryString = query.toString();
    if (queryString) {
        finalUrl += `?${queryString}`;
    }
    return finalUrl;
}

const urlBuilder = (url: string) =>
    (urlParams: URLParams = {}) =>
        (queryParams: QueryParams = {}) => {

            const param = (params: URLParams) =>
                urlBuilder(url)({ ...urlParams, ...params })(queryParams);

            const query = (params: QueryParams) =>
                urlBuilder(url)(urlParams)({ ...queryParams, ...params });

            const build = () => buildUrl({ url, urlParams, queryParams });

            return { param, query, build };
        }

const trigger = (url: string) => urlBuilder(url)()();

export default trigger;