import ReturnableHeader from "@/components/_base/returnable-header"
import { ModularBox } from "@/components/modular/box/ModularBox"
import { Stack } from "@mantine/core"
import OrderMassiveLoadForm from "./_components/order-massive-load-form"

const OrderMassiveLoadPage: React.FC = () => {
    return (
        <>
            <ReturnableHeader title='Carga de masiva de ordenes medicas' />
            <ModularBox flex={1}>
                <Stack h='100%' align='center' justify='center'>
                    <OrderMassiveLoadForm />
                </Stack>
            </ModularBox >
        </>
    )
}

export default OrderMassiveLoadPage