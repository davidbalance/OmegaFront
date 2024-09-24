import { withNoFetch } from "../../hoc/withNoFetch";
import { NoFetchProps } from "../../types";
import { ListLayoutBase } from "../base/ListLayoutBase";

interface ListLayoutProps<T> extends NoFetchProps<T> { }
const ListLayout = <T extends object>(props: ListLayoutProps<T>): React.ReactElement | null => {
    const Component = withNoFetch<T>(ListLayoutBase);
    return <Component {...props} />;
};

export { ListLayout }