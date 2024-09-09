import { ListRowProps } from "@/components/layout/list-layout/components/row/ListRow";
import { MedicalOrder, OrderStatus } from "@/lib/dtos/medical/order/base.response.dto";
import { Flex, rem, Text } from "@mantine/core";
import { MedicalOrderActionSendButton } from "../../../medical-order-mail/medical-email-button";
import { MedicalOrderActionValidateButton } from "../../../_base/medical-order-validate-button";

type ListRowPropOmittedProps = Omit<ListRowProps, 'rightSection'>

interface MedicalOrderAction {
    onMail?: (id: number, status: boolean) => void;
    onValidate?: (id: number, status: OrderStatus) => void;
}

export interface MedicalOrderListRowProps extends ListRowPropOmittedProps {
    data: MedicalOrder;
    actions?: MedicalOrderAction;
}

const rowWithMedicalOrder = (
    WrappedComponent: React.ComponentType<ListRowProps>
): React.FC<MedicalOrderListRowProps> => {

    const HOCListRow: React.FC<MedicalOrderListRowProps> = ({ data, actions, ...props }) => {
        return <WrappedComponent
            rightSection={actions ? (
                <Flex align='center' h='100%' gap={rem(16)}>
                    {actions.onMail && (
                        <MedicalOrderActionSendButton
                            order={data.id}
                            email={data.client.email}
                            mailStatus={data.mailStatus}
                            onMailSend={actions.onMail} />
                    )}
                    {actions.onValidate && (
                        <MedicalOrderActionValidateButton
                            orderStatus={data.orderStatus}
                            order={data.id}
                            onValidate={actions.onValidate} />
                    )}
                </Flex>
            ) : <Flex align='center' h='100%'>
                {data.mailStatus
                    ? (
                        <Text>Correo enviado</Text>
                    ) : (
                        <Text c='red'>Correo no enviado</Text>
                    )}
            </Flex>}
            {...props} />
    }

    return HOCListRow;
}

export { rowWithMedicalOrder }