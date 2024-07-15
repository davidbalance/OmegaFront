import { useConfirmation } from '@/contexts/confirmation/confirmation.context';
import { useFetch } from '@/hooks/useFetch';
import { notifications } from '@mantine/notifications';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Area } from '@/lib/dtos/location/area/response.dto';
import { useDeleteArea } from '../context/delete-area.context';

interface ExtendedFunctionalityProps {
  area: Area;
  onError?: () => void;
  onStart?: () => void;
  onEnd?: () => void;
}

const deleteAreaFunctionality = <T extends object>(
  WrappedComponent: React.ComponentType<T>
): React.FC<T & ExtendedFunctionalityProps> => {
  const DeleteAreaHOC: React.FC<T & ExtendedFunctionalityProps> = ({ area, onEnd, onError, onStart, ...props }: T & ExtendedFunctionalityProps) => {

    const [shouldSendRequest, setShouldSendRequest] = useState<boolean>(false);

    const elementRef = useRef<HTMLElement>(null);

    const {
      data: areaData,
      error: areaError,
      reload: areaReload,
      reset: areaReset,
    } = useFetch(`/api/area/${area.id}`, 'DELETE', { loadOnMount: false });

    const { show } = useConfirmation();

    const handleClick = useCallback(async () => {
      const userSelection = await show('El area va a ser eliminada', '¿Esta seguro?');
      if (userSelection) {
        setShouldSendRequest(true);
      }
    }, [show]);

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
        areaReload();
        setShouldSendRequest(false);
      }
    }, [shouldSendRequest, areaReload, onStart]);

    useEffect(() => {
      if (areaError) {
        notifications.show({ message: areaError.message, color: 'red' });
        onError?.();
      }
    }, [areaError, onError]);

    useEffect(() => {
      if (areaData) {
        areaReset();
        onEnd?.();
      }
    }, [areaData, areaReset, onEnd]);

    return <WrappedComponent {...(props as T)} ref={elementRef} />
  }

  DeleteAreaHOC.displayName = 'DeleteAreaHOC';
  return DeleteAreaHOC;
}


const deleteAreaFunctionalityWithContext = <T extends object>(
  WrappedComponent: React.ComponentType<T>
): React.FC<T & ExtendedFunctionalityProps> => {
  const DeleteAreaHOC: React.FC<T & ExtendedFunctionalityProps> = ({ area, onEnd, onError, onStart, ...props }: T & ExtendedFunctionalityProps) => {

    const { trigger } = useDeleteArea();
    const { show } = useConfirmation();
    const elementRef = useRef<HTMLElement>(null);

    const handleClick = useCallback(async () => {
      const userSelection = await show('El area va a ser eliminada', '¿Esta seguro?');
      if (userSelection) {
        trigger(area, onStart, onEnd, onError);
      }
    }, [show, area, trigger, onStart, onEnd, onError]);

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

  DeleteAreaHOC.displayName = 'DeleteAreaHOC';
  return DeleteAreaHOC;
}

export { deleteAreaFunctionality, deleteAreaFunctionalityWithContext };