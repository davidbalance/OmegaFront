import { rem, Skeleton } from '@mantine/core'
import React from 'react'
import OmegaShellSection from './omega-shell/omega-shell-section'


const OmegaNavbarContentSuspense: React.FC = async () => {
  return (
    <OmegaShellSection
      gap={rem(4)}>
      {
        [...Array(4)].map((e) => (
          <Skeleton key={`suspense-${e}`} width={rem(40)} h={rem(40)} />
        ))
      }
    </OmegaShellSection>
  )
}

export default OmegaNavbarContentSuspense