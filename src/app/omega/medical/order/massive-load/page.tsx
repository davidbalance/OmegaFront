import ReturnableHeader from "@/components/_base/returnable-header"
import { ModularBox } from "@/components/modular/box/ModularBox"
import { Box, Stack } from "@mantine/core"
import OrderMassiveLoadForm from "./_components/order-massive-load-form"
import MassiveLoadTemplateButton from "@/components/_base/massive-load-template-button"

const OrderMassiveLoadPage: React.FC = () => {
    return (
        <>
            <ReturnableHeader title='Carga de masiva de ordenes medicas' />
            <ModularBox flex={1}>
                <Stack
                    h='100%'
                    align='center'
                    justify='center'
                    pos='relative'>
                    <Box
                        component="div"
                        pos='absolute'
                        top={0}
                        right={0}>
                        <MassiveLoadTemplateButton type="order" />
                    </Box>
                    <OrderMassiveLoadForm />
                </Stack>
            </ModularBox >
        </>
    )
}

export default OrderMassiveLoadPage