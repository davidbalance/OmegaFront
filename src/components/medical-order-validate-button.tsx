'use client'

import { OrderStatus } from '@/lib/dtos/medical/order/base.response.dto';
import { updateMedicalOrderStatus } from '@/server/medical-order.actions';
import { ActionIcon, ActionIconProps, rem, Tooltip } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconLock, IconLockOpen2 } from '@tabler/icons-react';
import React, { useCallback, useMemo, useState } from 'react'

const ActionIconOrderStatusProps: Record<OrderStatus, ActionIconProps> = {
  created: {},
  validated: { variant: 'light', color: 'neutral' }
}

const IconsElement: Record<OrderStatus, React.ElementType> = {
  created: IconLockOpen2,
  validated: IconLock
}

const TooltipMessage: Record<OrderStatus, string> = {
  created: "Cerrar",
  validated: "Abrir"
}

interface MedicalOrderValidateButtonProps {
  id: number;
  orderStatus: OrderStatus;
}

const MedicalOrderValidateButton: React.FC<MedicalOrderValidateButtonProps> = ({
  id,
  orderStatus
}) => {

  const [loading, setLoading] = useState<boolean>(false);

  const currentButtonProps = useMemo((): ActionIconProps => ActionIconOrderStatusProps[orderStatus], [orderStatus]);

  const CurrentIcon = useMemo(() => IconsElement[orderStatus], [orderStatus]);

  const tooltipMessage = useMemo(() => TooltipMessage[orderStatus], [orderStatus]);

  const triggerAction = useCallback(async () => {
    setLoading(true);
    try {
      await updateMedicalOrderStatus(id, orderStatus === 'created' ? 'validated' : 'created');
    } catch (error: any) {
      notifications.show({ message: error.message, color: 'red' });
    } finally {
      setLoading(false);
    }
  }, [orderStatus])

  return (
    <Tooltip
      label={tooltipMessage}>
      <ActionIcon
        loading={loading}
        onClick={triggerAction}
        {...currentButtonProps} >
        <CurrentIcon style={{ width: rem(16), height: rem(16), lineHeight: rem(1.5) }} />
      </ActionIcon>
    </Tooltip>
  )
}

export default MedicalOrderValidateButton;