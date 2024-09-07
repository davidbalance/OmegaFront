import { rem } from '@mantine/core'
import React from 'react'
import OmegaShellLink from './omega-shell/omega-shell-link'
import OmegaShellSection from './omega-shell/omega-shell-section'
import omega from '@/lib/api-client/omega-client/omega'
import { GetOmegaWebClientResponseDto } from '@/lib/dtos/omega/web/client/response.dto'
import { auth } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { ObjectArray } from '@/lib/interfaces/object-array.interface'
import { OmegaWebClientResource } from '@/lib/dtos/omega/web/client/base.response.dto'


const OmegaNavbarContent: React.FC = async () => {
  try {
    const session = await auth();
    if (!session) redirect('/login');
    const { data }: ObjectArray<OmegaWebClientResource> = await omega().addToken(session.access_token).execute('accountResource');

    return (
      <OmegaShellSection
        gap={rem(4)}>
        {
          data.map((e) => (
            <OmegaShellLink
              key={e.label}
              href={e.address}
              {...e} />
          ))
        }
      </OmegaShellSection>
    )
  } catch (error) {
    return null;
  }
}

export default OmegaNavbarContent