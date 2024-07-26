import { useConfirmation } from '@/contexts/confirmation/confirmation.context';
import { useFetch } from '@/hooks/useFetch';
import { notifications } from '@mantine/notifications';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDeleteManagement } from '../context/delete-management.context';
import { Management } from '@/lib/dtos/location/management/base.response.dto';

interface ExtendedFunctionalityProps {
  management: Management;
  onError?: () => void;
  onStart?: () => void;
  onEnd?: () => void;
}

const deleteManagementFunctionality = <T extends object>(
  WrappedComponent: React.ComponentType<T>
): React.FC<T & ExtendedFunctionalityProps> => {
  const DeleteManagementHOC: React.FC<T & ExtendedFunctionalityProps> = ({ management, onEnd, onError, onStart, ...props }: T & ExtendedFunctionalityProps) => {

    const [shouldSendRequest, setShouldSendRequest] = useState<boolean>(false);

    const elementRef = useRef<HTMLElement>(null);

    const {
      data: managementData,
      error: managementError,
      reload: managementReload,
      reset: managementReset,
    } = useFetch(`/api/management/${management.id}`, 'DELETE', { loadOnMount: false });

    const { show } = useConfirmation();

    const handleClick = useCallback(async () => {
      if (management.areas && management.areas.length) {
        notifications.show({ message: 'Esta gerencia tiene areas asociadas', color: 'red' });
        return;
      }
      const userSelection = await show('La gerencia va a ser eliminada', '¿Esta seguro?');
      if (userSelection) {
        setShouldSendRequest(true);
      }
    }, [show, management]);

    useEffect(() => {

      const currentElement = elementRef.current;
      if (currentElement) {
        currentElement.addEventListener('click', handleClick);
      }
      return () => {
        if (currentElement) {
          currentElement.removeEventListener('click', handleClick);
        }
      }

    }, [handleClick]);

    useEffect(() => {
      if (shouldSendRequest) {
        onStart?.();
        managementReload();
        setShouldSendRequest(false);
      }
    }, [shouldSendRequest, managementReload, onStart]);

    useEffect(() => {
      if (managementError) {
        notifications.show({ message: managementError.message, color: 'red' });
        onError?.();
      }
    }, [managementError, onError]);

    useEffect(() => {
      if (managementData) {
        managementReset();
        onEnd?.();
      }
    }, [managementData, managementReset, onEnd]);

    return <WrappedComponent {...(props as T)} ref={elementRef} />
  }


  DeleteManagementHOC.displayName = 'DeleteManagementHOC';

  return DeleteManagementHOC;
}


const deleteManagementFunctionalityWithContext = <T extends object>(
  WrappedComponent: React.ComponentType<T>
): React.FC<T & ExtendedFunctionalityProps> => {
  const DeleteManagementHOC: React.FC<T & ExtendedFunctionalityProps> = ({ management, onEnd, onError, onStart, ...props }: T & ExtendedFunctionalityProps) => {

    const { trigger } = useDeleteManagement();
    const { show } = useConfirmation();
    const elementRef = useRef<HTMLElement>(null);

    const handleClick = useCallback(async () => {
      if (management.areas && management.areas.length) {
        notifications.show({ message: 'Esta gerencia tiene areas asociadas', color: 'red' });
        return;
      }
      const userSelection = await show('La gerencia va a ser eliminada', '¿Esta seguro?');
      if (userSelection) {
        trigger(management, onStart, onEnd, onError);
      }
    }, [show, management, trigger, onStart, onEnd, onError]);

    useEffect(() => {

      const currentElement = elementRef.current;
      if (currentElement) {
        currentElement.addEventListener('click', handleClick);
      }
      return () => {
        if (currentElement) {
          currentElement.removeEventListener('click', handleClick);
        }
      }

    }, [handleClick]);

    return <WrappedComponent {...(props as T)} ref={elementRef} />
  }

  DeleteManagementHOC.displayName = 'DeleteManagementHOC';

  return DeleteManagementHOC;
}


export { deleteManagementFunctionality, deleteManagementFunctionalityWithContext };