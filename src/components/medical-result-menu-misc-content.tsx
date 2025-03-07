import { MenuLabel, MenuItem, rem } from '@mantine/core'
import { IconVirus, IconStethoscope } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

interface MedicalResultMenuMiscContentProps {
  testId: string;
}
const MedicalResultMenuMiscContent: React.FC<MedicalResultMenuMiscContentProps> = ({
  testId,
}) => {
  return (<>
    <MenuLabel>Misc.</MenuLabel>
    <MenuItem
      component={Link}
      href={`/omega/test/${testId}/disease`}
      leftSection={(
        <IconVirus style={{ width: rem(16), height: rem(16) }} />
      )}>
      Modificar morbilidades
    </MenuItem>
    <MenuItem
      component={Link}
      href={`/omega/test/${testId}/exam`}
      leftSection={(
        <IconStethoscope style={{ width: rem(16), height: rem(16) }} />
      )}>
      Modificar tipo de examen
    </MenuItem>
  </>)
}

export default MedicalResultMenuMiscContent