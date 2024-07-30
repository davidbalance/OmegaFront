import { Menu, MenuTarget, Flex, ActionIcon, rem } from '@mantine/core'
import { IconDotsVertical, IconBuilding, IconAt, IconBuildingCommunity, IconBriefcase } from '@tabler/icons-react'
import React from 'react'

interface PatientActionButtonProps {
  /**
   * Funcion que es invocada cuando se llama al evento de asignacion de empresas.
   * @returns 
   */
  onAssignCompany?: () => void;
  /**
   * Funcion que es invocada cuando se llama al evento de asignacion de correos electronicos.
   * @returns 
   */
  onEmail?: () => void;
  /**
   * Funcion que es invocada cuando se llama al evento de asignacion de correos electronicos.
   * @returns 
   */
  onManagementArea?: () => void;

  onJobPosition?: () => void;
}
const PatientActionButton: React.FC<PatientActionButtonProps> = ({ onAssignCompany, onEmail, onManagementArea, onJobPosition }) => {
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
          Asignar empresa
        </Menu.Item>
        <Menu.Item
          leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
          onClick={onEmail}>
          Correos electronicos
        </Menu.Item>
        <Menu.Item
          leftSection={<IconBuildingCommunity style={{ width: rem(16), height: rem(16) }} />}
          onClick={onManagementArea}>
          Asignar gerencia y area
        </Menu.Item>
        <Menu.Item
          onClick={onJobPosition}
          leftSection={(
            <IconBriefcase style={{ width: rem(16), height: rem(16) }} />
          )}>
          Asignar puesto de trabajo
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export { PatientActionButton }