import { Menu, MenuTarget, Flex, ActionIcon, rem } from '@mantine/core'
import { IconDotsVertical, IconBuilding, IconAt } from '@tabler/icons-react'
import React from 'react'

interface PatientActionButtonProps {
  onAssignCompany?: () => void;
  onEmail?: () => void;
}
const PatientActionButton: React.FC<PatientActionButtonProps> = ({ onAssignCompany, onEmail }) => {
  return (
    <Menu>
      <MenuTarget>
        <Flex justify='center'>
          <ActionIcon variant="transparent">
            <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Flex>
      </MenuTarget>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconBuilding style={{ width: rem(16), height: rem(16) }} />}
          onClick={onAssignCompany}>
          Asignar Empresa
        </Menu.Item>
        <Menu.Item
          leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
          onClick={onEmail}>
          Correos Electronicos
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export { PatientActionButton }