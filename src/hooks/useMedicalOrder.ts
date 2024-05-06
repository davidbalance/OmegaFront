import { OrderService } from "@/services/api";
import { FindOrdersRQ, Order } from "@/services/api/order/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

export const useMedicalOrder = (dni?: string, loadOnStart: boolean = false) => {
    const orderService = new OrderService(endpoints.ORDER.V1);

    const [loading, Disclosure] = useDisclosure();
    const [orders, setOrders] = useState<Order[] | undefined>(undefined);
    const [index, setIndex] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (dni && loadOnStart) {
            find({ dni });
        }
        return () => { }
    }, []);


    const find = async (params: FindOrdersRQ) => {
        Disclosure.open();
        try {
            const orders = await orderService.find(params);
            setOrders(orders);
            Disclosure.close();
            return orders;
        } catch (error) {
            notifications.show({
                title: 'Error al obtener los usuarios',
                message: 'Se produjo un error al actualizar la contraseña 😔',
                color: 'red'
            });
            console.error(error);
            Disclosure.close();
            throw error;
        }
    }

    const selectItem = (index: number) => setIndex(index);
    const clearItem = () => setIndex(undefined);

    return {
        loading,
        orders,
        order: (index !== undefined && orders) ? orders[index] : undefined,
        find,
        selectItem,
        clearItem
    }
}