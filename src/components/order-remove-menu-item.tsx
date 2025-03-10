'use client'

import { useActionMenu } from "@/contexts/action-menu.context";
import { removeMedicalOrder } from "@/server/medical_order/actions";
import { MenuItem, rem } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useCallback } from "react";

interface OrderRemoveMenuItemProps {
    orderId: string,
}
const OrderRemoveMenuItem: React.FC<OrderRemoveMenuItemProps> = ({
    orderId
}) => {

    const { trigger } = useActionMenu();

    const handleClick = useCallback(
        () => {
            const promise = removeMedicalOrder(orderId);
            trigger(promise);
        }, [trigger, orderId]);

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