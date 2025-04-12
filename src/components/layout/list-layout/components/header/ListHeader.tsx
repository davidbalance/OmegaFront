import { UnstyledButton, Flex, Center, Text } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconChevronUp, IconChevronDown, IconSelector } from "@tabler/icons-react";
import classes from '../../styles/ListLayoutBase.module.css'

interface ListHeaderButtonProps {
    /**
     * Texto de la etiqueta.
     */
    label: string;
    /**
     * Variable que determina el evento de ordenamiento y el estado del mismo.
     */
    sort: {
        sorted: boolean;
        onSort: () => void;
    };
}

const ListHeader: React.FC<ListHeaderButtonProps> = ({ label, sort }) => {
    const [reversed, { toggle }] = useDisclosure(false);
    const isMobile = useMediaQuery('(max-width: 50em)');

    const Icon = sort.sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;

    const handleSortClick = () => {
        toggle();
        sort.onSort();
    };

    return (
        <UnstyledButton
            className={classes.control}
            data-active={sort.sorted || undefined}
            onClick={handleSortClick}
            w="100%"
            h="100%"
        >
            <Flex justify="space-between" align="center">
                <Text className={classes.text} fw={500} size={isMobile ? 'xs' : 'sm'}>
                    {label}
                </Text>
                <Center className={classes.icon}>
                    <Icon className={classes['icon-size']} stroke={1.5} />
                </Center>
            </Flex>
        </UnstyledButton>
    );
};

export { ListHeader };