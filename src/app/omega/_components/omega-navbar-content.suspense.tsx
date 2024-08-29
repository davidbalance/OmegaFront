import { rem, Skeleton } from '@mantine/core'
import React from 'react'
import OmegaShellSection from './omega-shell/omega-shell-section'


const OmegaNavbarContent: React.FC = async () => {
  return (
    <OmegaShellSection
      gap={rem(4)}>
      {
        [1, 2, 3, 4, 5].map((e) => (
          <Skeleton width={rem(40)} h={rem(40)} />
        ))
      }
    </OmegaShellSection>
  )
}

export default OmegaNavbarContent