'use client'

import { updateChecklist } from '@/server/checklist.actions';
import { Checkbox } from '@mantine/core';
import React, { useState } from 'react'

interface ChecklistItemProps {
  id: number;
  initial: boolean;
  label: string;
}
const ChecklistItem: React.FC<ChecklistItemProps> = ({
  id,
  label,
  initial
}) => {

  const [checked, setChecked] = useState<boolean>(initial);

  const handleChange = async (status: boolean) => {
    try {
      setChecked(status);
      await updateChecklist(id, status);
    } catch (error: any) {
      console.error(error.message);
      setChecked(!status);
    }
  };

  return (
    <Checkbox
      size='md'
      checked={checked}
      label={label}
      onChange={event => handleChange(event.currentTarget.checked)}
    />
  )
}

export default ChecklistItem