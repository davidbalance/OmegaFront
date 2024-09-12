import { MenuLabel, MenuItem, rem } from '@mantine/core'
import { IconVirus, IconStethoscope } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

interface MedicalResultMenuMiscContentProps {
  result: number;
  show?: boolean
}
const MedicalResultMenuMiscContent: React.FC<MedicalResultMenuMiscContentProps> = ({
  result,
  show
}) => {
  return (
    show
      ? (<>
        <MenuLabel>Misc.</MenuLabel>
        <MenuItem
          component={Link}
          href={`/omega/medical/result/${result}/disease`}
          leftSection={(
            <IconVirus style={{ width: rem(16), height: rem(16) }} />
          )}>
          Modificar morbilidades
        </MenuItem>
        <MenuItem
          component={Link}
          href={`/omega/medical/result/${result}/exam`}
          leftSection={(
            <IconStethoscope style={{ width: rem(16), height: rem(16) }} />
          )}>
          Modificar tipo de examen
        </MenuItem>
      </>)
      : null)
}

export default MedicalResultMenuMiscContent