import { MenuLabel, MenuItem, rem } from '@mantine/core'
import { IconVirus, IconStethoscope } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'
import MedicalTestRemove from './medical-test-remove';

interface MedicalTestMenuMiscContentProps {
  testId: string;
  editable?: boolean;
}
const MedicalTestMenuMiscContent: React.FC<MedicalTestMenuMiscContentProps> = ({
  testId,
  editable = false
}) => {
  return (<>
    {editable ? <MenuLabel>Misc.</MenuLabel> : null}
    {editable && <MenuItem
      component={Link}
      href={`/omega/test/${testId}/disease`}
      leftSection={(
        <IconVirus style={{ width: rem(16), height: rem(16) }} />
      )}>
      Modificar morbilidades
    </MenuItem>}
    {editable && <MenuItem
      component={Link}
      href={`/omega/test/${testId}/exam`}
      leftSection={(
        <IconStethoscope style={{ width: rem(16), height: rem(16) }} />
      )}>
      Modificar tipo de examen
    </MenuItem>}
    {editable && <MedicalTestRemove testId={testId} />}
  </>)
}

export default MedicalTestMenuMiscContent