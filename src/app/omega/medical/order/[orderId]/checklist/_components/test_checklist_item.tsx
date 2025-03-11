'use client'

import { checkMedicalTest, uncheckMedicalTest } from '@/server/medical_test/actions';
import { Checkbox } from '@mantine/core';
import { useDebounceCallback } from '@mantine/hooks';
import React, { useCallback, useState } from 'react'

interface TestChecklistItemProps {
  testId: string;
  check: boolean;
  examName: string;
}
const TestChecklistItem: React.FC<TestChecklistItemProps> = ({
  testId,
  check,
  examName,
}) => {

  const [checked, setChecked] = useState<boolean>(check);
  const [pendingCheck, setPendingCheck] = useState<boolean>(check);

  const updateCheckStatus = async () => {
    try {
      if (pendingCheck) {
        await checkMedicalTest(testId);
      } else {
        await uncheckMedicalTest(testId);
      }
    } catch (error: any) {
      setChecked(!pendingCheck);
    }
  };

  const debouncedUpdate = useDebounceCallback(() => {
    updateCheckStatus();
  }, 300);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.currentTarget.checked;
    setChecked(isChecked);
    setPendingCheck(isChecked);
    debouncedUpdate();
  }, [debouncedUpdate]);

  return (
    <Checkbox
      size='md'
      checked={checked}
      label={examName}
      onChange={handleChange}
    />
  )
}

export default TestChecklistItem
