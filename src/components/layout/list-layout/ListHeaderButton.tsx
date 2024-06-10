import { UnstyledButton, Flex, Center, rem, Text } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconChevronUp, IconChevronDown, IconSelector } from "@tabler/icons-react";
import classes from './ListLayout.module.css'

interface ListHeaderButtonProps {
    label: string;
    sort: {
        sorted: boolean;
        onSort: () => void;
    }
}
const ListHeaderButton: React.FC<ListHeaderButtonProps> = ({ label, sort }) => {
    const [reversed, { toggle }] = useDisclosure(false);
    const isMobile = useMediaQuery('(max-width: 50em)');

    const Icon = sort?.sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;

    const handleSortClick = () => {
        toggle();
        sort?.onSort();
    }

    return (
        <UnstyledButton className={classes.control} data-active={sort.sorted || undefined} onClick={handleSortClick} w='100%' h='100%'>
            <Flex justify="space-between" align='center'>
                <Text className={classes.text} fw={500} size={isMobile ? 'xs' : 'sm'}>
                    {label}
                </Text>
                <Center className={classes.icon}>
                    <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                </Center>
            </Flex>
        </UnstyledButton>
    )
}

export { ListHeaderButton }