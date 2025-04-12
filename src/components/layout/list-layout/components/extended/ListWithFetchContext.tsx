import { withFetchContext } from "../../hoc/withFetchContext";
import { FetchContextProps } from "../../types";
import { ListLayoutBase } from "../base/ListLayoutBase";

interface ListWithFetchContextProps<T> extends FetchContextProps<T> { }
const ListWithFetchContext = <T extends object>(props: ListWithFetchContextProps<T>): React.ReactElement | null => {
    const Component = withFetchContext<T>(ListLayoutBase);
    return <Component {...props} />;
};

export { ListWithFetchContext }