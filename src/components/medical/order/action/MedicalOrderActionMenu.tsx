import { MedicalOrder } from '@/lib/dtos/medical/order/response.dto';
import { Menu, MenuTarget, Loader, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDotsVertical } from '@tabler/icons-react';
import React, { useCallback } from 'react'
import { MenuItemSendMail } from '../../../menu/item/MenuItemSendMail';

type MedicalOrderWithoutMedicalResults = Omit<MedicalOrder, 'results'>;
interface MedicalOrderActionMenuProps {
    data: MedicalOrderWithoutMedicalResults;
    onMailSend: (data: MedicalOrderWithoutMedicalResults) => void;
}
const MedicalOrderActionMenu: React.FC<MedicalOrderActionMenuProps> = ({ data, onMailSend }) => {
    const [loading, { close, open }] = useDisclosure(false);

    const handleSendEvent = useCallback(() => open(), [open]);

    const handleCompleteEvent = useCallback(() => {
        onMailSend({
            ...data,
            mailStatus: true
        });
    }, [data, onMailSend]);

    const handleErrorEvent = useCallback(() => {
        close();
    }, [close]);

    return (
        <Menu onClose={close} disabled={loading}>
            <MenuTarget>
                {
                    loading
                        ? <Loader size='xs' />
                        : <ActionIcon variant="transparent">
                            <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                }
            </MenuTarget>
            <Menu.Dropdown>
                <MenuItemSendMail
                    url={`/api/medical/orders/mail/${data.id}`}
                    onComplete={handleCompleteEvent}
                    onSend={handleSendEvent}
                    onError={handleErrorEvent}
                />
            </Menu.Dropdown>
        </Menu>
    )
}

export default MedicalOrderActionMenu