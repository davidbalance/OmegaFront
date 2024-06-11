import { Flex, rem, UnstyledButton } from "@mantine/core";
import classes from './ListLayout.module.css'
import cx from 'clsx';

interface ListRowElementProps<T> {
    children: React.ReactNode;
    active?: boolean;
    leftSection?: React.ReactNode;
    rightSection?: React.ReactNode;
    hover?: boolean;
    onClick?: () => void;
}

const ListRowElement: <T extends object>(props: ListRowElementProps<T>) => React.ReactElement = ({ leftSection, rightSection, children, active, hover = true, onClick }) => {
    return (
        <Flex w='100%' gap={rem(20)} className={classes['list-element']}>
            {leftSection && <Flex align='center' key={`data-left-section`} className={classes['list-content']}>{leftSection}</Flex>}
            <UnstyledButton
                data-active={active}
                onClick={onClick} flex={1} className={cx(classes['list-content'], { [classes.clickable]: !!onClick, [classes.hoverable]: hover })}>
                {children}
            </UnstyledButton>
            {rightSection && <Flex align='center' key={`data-right-section`} className={classes['list-content']}>{rightSection}</Flex>}
        </Flex>);
}

export { ListRowElement };
export type { ListRowElementProps };
