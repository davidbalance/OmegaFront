import { rem } from '@mantine/core'
import React from 'react'
import OmegaShellLink from './omega-shell/omega-shell-link'
import OmegaShellSection from './omega-shell/omega-shell-section'
import { redirect } from 'next/navigation'
import auth from '@/lib/auth'
import { findMe } from '@/server'

const OmegaNavbarContent: React.FC = async () => {
  try {
    const session = await auth();
    if (!session) redirect('/login');
    const me = await findMe();

    return (
      <OmegaShellSection
        gap={rem(4)}>
        {
          me.resources.map((e) => (
            <OmegaShellLink
              key={e.label}
              href={e.address}
              label={e.label}
              icon={e.icon} />
          ))
        }
      </OmegaShellSection>
    )
  } catch (error) {
    return null;
  }
}

export default OmegaNavbarContent