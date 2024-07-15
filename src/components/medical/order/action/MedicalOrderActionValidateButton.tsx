import { useConfirmation } from '@/contexts/confirmation/confirmation.context';
import { useFetch } from '@/hooks/useFetch';
import { OrderStatus } from '@/lib/dtos/medical/order/response.dto';
import { ActionIcon, ActionIconProps, rem, Tooltip } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconLock, IconLockOpen2 } from '@tabler/icons-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

const ActionIconOrderStatusProps: Record<OrderStatus, ActionIconProps> = {
  created: {},
  validated: { variant: 'light', color: 'neutral', disabled: true }
}

const IconsElement: Record<OrderStatus, React.ElementType> = {
  created: IconLockOpen2,
  validated: IconLock
}

const TooltipMessage: Record<OrderStatus, string> = {
  created: "Cerrar",
  validated: ""
}

interface MedicalOrderActionValidateButtonProps {
  order: number;
  orderStatus: OrderStatus;
  onValidate: (id: number, newStatus: OrderStatus) => void;
}

const MedicalOrderActionValidateButton: React.FC<MedicalOrderActionValidateButtonProps> = ({ order, onValidate, orderStatus }) => {

  const {
    data: orderData,
    body: orderBody,
    error: orderError,
    loading: orderLoading,
    reload: orderReload,
    request: orderRequest,
    reset: orderReset,
  } = useFetch(`/api/medical/orders/order/${order}/status/validate`, 'PATCH', { loadOnMount: false });

  const { show } = useConfirmation();

  const [shouldSendRequest, setShouldSendRequest] = useState<boolean>(false);

  const currentButtonProps = useMemo((): ActionIconProps => ActionIconOrderStatusProps[orderStatus], [orderStatus]);

  const CurrentIcon = useMemo(() => IconsElement[orderStatus], [orderStatus]);

  const tooltipMessage = useMemo(() => TooltipMessage[orderStatus], [orderStatus]);

  const handleClickEvent = useCallback(async () => {
    const userResponse = await show('Se va a actualizar el estado de la orden a cerrado', '¿Esta seguro?');
    if (userResponse) {
      orderRequest({});
      setShouldSendRequest(true);
    }
  }, [show, orderRequest]);

  useEffect(() => {
    if (orderError) notifications.show({ message: orderError.message, color: 'red' });
  }, [orderError]);

  useEffect(() => {
    if (orderBody && shouldSendRequest) {
      orderReload();
      setShouldSendRequest(false);
    }
  }, [shouldSendRequest, orderBody, orderReload]);

  useEffect(() => {
    if (orderData) {
      onValidate(order, "validated");
      orderReset();
    }
  }, [order, orderData, orderReset, onValidate]);

  return (
    <Tooltip
      label={tooltipMessage}
      disabled={orderStatus === 'validated'}>
      <ActionIcon onClick={handleClickEvent} {...currentButtonProps} loading={orderLoading}>
        <CurrentIcon style={{ width: rem(16), height: rem(16), lineHeight: rem(1.5) }} />
      </ActionIcon>
    </Tooltip>
  )
}

export { MedicalOrderActionValidateButton }