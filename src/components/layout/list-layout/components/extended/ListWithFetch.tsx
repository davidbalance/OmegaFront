import { withFetchContext } from "../../hoc/withFetchContext";
import { FetchProps } from "../../types";
import { ListLayoutBase } from "../base/ListLayoutBase";

interface ListWithFetchProps<T> extends FetchProps<T> { }
const ListWithFetch = <T extends object>(props: ListWithFetchProps<T>): React.ReactElement | null => {
    const Component = withFetchContext<T>(ListLayoutBase);
    return <Component {...props} />;
};

export { ListWithFetch }