import { useConfirmation } from '@/contexts/confirmation/confirmation.context';
import { useFetch } from '@/hooks/useFetch';
import { notifications } from '@mantine/notifications';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ExamSubtype } from '@/lib/dtos/laboratory/exam/subtype/base.response.dto';
import { useDeleteExamSubtype } from '../context/delete-exam-subtype-context';

interface ExtendedFunctionalityProps {
  examSubtype: ExamSubtype;
  onError?: () => void;
  onStart?: () => void;
  onEnd?: () => void;
}

const deleteExamSubtypeFunctionality = <T extends object>(
  WrappedComponent: React.ComponentType<T>
): React.FC<T & ExtendedFunctionalityProps> => {
  const DeleteAreaHOC: React.FC<T & ExtendedFunctionalityProps> = ({ examSubtype, onEnd, onError, onStart, ...props }: T & ExtendedFunctionalityProps) => {

    const [shouldSendRequest, setShouldSendRequest] = useState<boolean>(false);

    const elementRef = useRef<HTMLElement>(null);

    const {
      data: examSubtypeData,
      error: examSubtypeError,
      reload: examSubtypeReload,
      reset: examSubtypeReset,
    } = useFetch(`/api/exam/subtypes/${examSubtype.id}`, 'DELETE', { loadOnMount: false });

    const { show } = useConfirmation();

    const handleClick = useCallback(async () => {
      const userSelection = await show('El subtipo va a ser eliminada', '¿Esta seguro?');
      if (userSelection) {
        if (examSubtype.exams.length) {
          notifications.show({ message: 'Este subtipo tiene examenes asociados' });
        } else {
          setShouldSendRequest(true);
        }
      }
    }, [show, examSubtype]);

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
        examSubtypeReload();
        setShouldSendRequest(false);
      }
    }, [shouldSendRequest, examSubtypeReload, onStart]);

    useEffect(() => {
      if (examSubtypeError) {
        notifications.show({ message: examSubtypeError.message, color: 'red' });
        onError?.();
      }
    }, [examSubtypeError, onError]);

    useEffect(() => {
      if (examSubtypeData) {
        examSubtypeReset();
        onEnd?.();
      }
    }, [examSubtypeData, examSubtypeReset, onEnd]);

    return <WrappedComponent {...(props as T)} ref={elementRef} />
  }

  DeleteAreaHOC.displayName = 'DeleteAreaHOC';
  return DeleteAreaHOC;
}


const deleteExamSubtypeFunctionalityWithContext = <T extends object>(
  WrappedComponent: React.ComponentType<T>
): React.FC<T & ExtendedFunctionalityProps> => {
  const DeleteAreaHOC: React.FC<T & ExtendedFunctionalityProps> = ({ examSubtype, onEnd, onError, onStart, ...props }: T & ExtendedFunctionalityProps) => {

    const { trigger } = useDeleteExamSubtype();
    const { show } = useConfirmation();
    const elementRef = useRef<HTMLElement>(null);

    const handleClick = useCallback(async () => {
      const userSelection = await show('El subtipo va a ser eliminado', '¿Esta seguro?');
      if (userSelection) {
        if (examSubtype.exams.length) {
          notifications.show({ message: 'Este subtipo tiene examenes asociados' });
        } else {
          trigger(examSubtype.id, onStart, onEnd, onError);
        }
      }
    }, [show, examSubtype, trigger, onStart, onEnd, onError]);

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

export { deleteExamSubtypeFunctionality, deleteExamSubtypeFunctionalityWithContext };