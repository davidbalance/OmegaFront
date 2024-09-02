'use client'

import { UnstyledButton } from '@mantine/core'
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react'

interface AddQueryParamProps {
  queryKey: string;
  value: string;
  children: React.ReactNode;
  removeQueries?: string[];
}
const AddQueryParam: React.FC<AddQueryParamProps> = ({
  queryKey,
  value,
  children,
  removeQueries
}) => {

  const pathname = usePathname()
  const query = useSearchParams()

  const params = new URLSearchParams(query);
  params.set(queryKey, value);
  if (removeQueries) {
    for (const key of removeQueries) {
      params.delete(key);
    }
  }

  return (
    <UnstyledButton
      component={Link}
      href={{
        pathname: pathname,
        query: params.toString()
      }}>
      {children}
    </UnstyledButton>
  )
}

export default AddQueryParam