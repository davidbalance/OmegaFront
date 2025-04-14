import { rem, Stack, Text } from '@mantine/core'
import React from 'react'

type PreviewRecordElementProps = {
  title: string;
  text: string;
}
const PreviewRecordElement: React.FC<PreviewRecordElementProps> = ({
  title,
  text
}) => {
  return (
    <Stack gap={rem(2)}>
      <Text component='span' fw='bolder'>{title}</Text>
      <Text component='span'>{text}</Text>
    </Stack>
  )
}

export default PreviewRecordElement