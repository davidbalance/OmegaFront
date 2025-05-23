'use client'

import { useActionMenu } from "@/contexts/action-menu.context";
import { useConfirmation } from "@/contexts/confirmation.context";
import { removeMedicalOrder } from "@/server";
import { MenuItem, rem } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface OrderRemoveMenuItemProps {
    orderId: string,
    query?: string;
}
const OrderRemoveMenuItem: React.FC<OrderRemoveMenuItemProps> = ({
    orderId,
    query
}) => {

    const { trigger } = useActionMenu();
    const router = useRouter();
    const { show } = useConfirmation();

    const pathname = usePathname()
    const queryParam = useSearchParams();

    const checkSelection = useCallback(() => {
        if (query) {
            const newQuery = new URLSearchParams(queryParam);
            const queryId = newQuery.get(query);
            if (queryId === orderId) {
                newQuery.delete(query);
                const newUrl = `${pathname}?${newQuery.toString()}`;
                router.replace(newUrl);
            }
        }
    }, [query, orderId, router, pathname, queryParam]);

    const handleClick = useCallback(
        async () => {
            const response = await show('¿Esta seguro?', 'Se va a eliminar una orden medica, ¿Está seguro?');
            if (response) {
                const promise = removeMedicalOrder(orderId);
                checkSelection();
                if (query) {
                    trigger(promise);
                }
            }
        }, [trigger, query, show, orderId, checkSelection]);

    return (
        <MenuItem
            onClick={handleClick}
            color="red"
            leftSection={(
                <IconTrash style={{ width: rem(16), height: rem(16) }} />
            )}>
            Eliminar Orden
        </MenuItem>
    )
}

export default OrderRemoveMenuItem