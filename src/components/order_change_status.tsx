'use client'

import { getErrorMessage } from '@/lib/utils/errors';
import { createdStatusMedicalOrder, validatedStatusMedicalOrder } from '@/server/medical_order/actions';
import { OrderStatus } from '@/server/medical_order/server_types';
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

interface OrderChangeStatusProps {
  orderId: string;
  orderStatus: OrderStatus;
}

const OrderChangeStatus: React.FC<OrderChangeStatusProps> = ({
  orderId,
  orderStatus
}) => {

  const [loading, setLoading] = useState<boolean>(false);
  const currentButtonProps = useMemo((): ActionIconProps => ActionIconOrderStatusProps[orderStatus], [orderStatus]);
  const CurrentIcon = useMemo(() => IconsElement[orderStatus], [orderStatus]);
  const tooltipMessage = useMemo(() => TooltipMessage[orderStatus], [orderStatus]);

  const triggerAction = useCallback(async () => {
    setLoading(true);
    try {
      switch (orderStatus) {
        case 'created':
          await validatedStatusMedicalOrder(orderId);
          break;
        case 'validated':
          await createdStatusMedicalOrder(orderId);
          break;
      }
    } catch (error: any) {
      notifications.show({ message: getErrorMessage(error), color: 'red' });
    } finally {
      setLoading(false);
    }
  }, [orderId, orderStatus])

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

export default OrderChangeStatus;