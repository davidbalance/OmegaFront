import { rem, Skeleton } from '@mantine/core'
import React from 'react'
import OmegaShellSection from './omega-shell/omega-shell-section'
import { ModularBox } from '@/components/modular/box/ModularBox'


const OmegaNavbarContentSuspense: React.FC = async () => {
  return (
    <OmegaShellSection
      gap={rem(4)}>
      {
        [...Array(4)].map((e) => (
          <ModularBox key={`suspense-${Math.random()}`}>
            <Skeleton w={rem(30)} h={rem(30)} />
          </ModularBox>
        ))
      }
    </OmegaShellSection>
  )
}

export default OmegaNavbarContentSuspense