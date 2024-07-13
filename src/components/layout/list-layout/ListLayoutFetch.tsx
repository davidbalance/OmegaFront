import { listlayoutFetchFunctionality, ListLayoutFetchProps } from "./hoc/listlayoutWithFetchFunctionality";
import { ListLayoutBase } from "./ListLayoutBase";

const ListLayoutFetch = <T extends object>(props: ListLayoutFetchProps<T>): React.ReactElement | null => {
    const Component = listlayoutFetchFunctionality<T>(ListLayoutBase);
    return <Component {...props} />;
};

export { ListLayoutFetch }