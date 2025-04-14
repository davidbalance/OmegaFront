import { rem, Stack } from '@mantine/core'
import React from 'react'

type PreviewRecordContentProps = {
  children: React.ReactNode
}
const PreviewRecordContent: React.FC<PreviewRecordContentProps> = ({
  children
}) => {
  return (
    <Stack
      px={rem(16)}
      gap={rem(16)}>
      {children}
    </Stack>
  )
}

export default PreviewRecordContent