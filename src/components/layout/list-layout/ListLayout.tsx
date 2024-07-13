import { listlayoutNoFetchFunctionality, ListLayoutProps } from "./hoc/listlayoutNoFetchFunctionality";
import { ListLayoutBase } from "./ListLayoutBase";

const ListLayout = <T extends object>(props: ListLayoutProps<T>): React.ReactElement | null => {
    const Component = listlayoutNoFetchFunctionality<T>(ListLayoutBase);
    return <Component {...props} />;
};

export { ListLayout }