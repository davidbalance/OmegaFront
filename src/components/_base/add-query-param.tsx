'use client'

import { UnstyledButton } from '@mantine/core'
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react'

interface AddQueryParamProps {
  query: string;
  value: string;
  children: React.ReactNode;
  removeQueries?: string[];
}
const AddQueryParam: React.FC<AddQueryParamProps> = ({
  query,
  value,
  children,
  removeQueries
}) => {

  const pathname = usePathname()
  const queryParam = useSearchParams()

  const params = new URLSearchParams(queryParam);
  params.set(query, value);
  if (removeQueries) {
    for (const key of removeQueries) {
      params.delete(key);
    }
  }

  return (
    <UnstyledButton
      w='100%'
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