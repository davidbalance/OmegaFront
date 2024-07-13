import { ListRowProps } from "../components/row/ListRow";
import { ListLayoutBaseProps } from "./base.type";

export interface ListLayoutBaseOmittedProps<T> extends Omit<ListLayoutBaseProps<T>, 'data' | 'total' | 'sort' | 'onSort' | 'onPageChange' | 'searchProps'> { }

interface CommonFunctionalityProps<T> {
    rows: (row: T) => React.ReactElement<ListRowProps>;
    reload?: boolean;
    size?: number;
}

export type FetchContextProps<T> = CommonFunctionalityProps<T> & Omit<ListLayoutBaseOmittedProps<T>, 'loading'>;
export type NoFetchProps<T> = CommonFunctionalityProps<T> & ListLayoutBaseOmittedProps<T> & { data: T[] };
export type FetchProps<T> = CommonFunctionalityProps<T> & ListLayoutBaseOmittedProps<T> & { url: string; loadOnMount?: boolean; };