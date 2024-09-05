'use client'
import React from 'react'
import ActionMenu from '@/components/_base/action-menu'
import { useActionUser } from '@/contexts/action-menu.context'

interface MedicalResultMenuProps {
  children: React.ReactNode
}
const MedicalResultMenu: React.FC<MedicalResultMenuProps> = ({
  children
}) => {

  const { load } = useActionUser();

  return (
    <ActionMenu loading={load}>
      {children}
    </ActionMenu>
  )
}

export default MedicalResultMenu