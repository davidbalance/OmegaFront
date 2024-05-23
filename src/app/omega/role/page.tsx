'use client'

import React, { useState } from "react"
import { useDisclosure } from '@mantine/hooks';
import DeleteRoleDialog from "@/components/role/delete-role-dialog/DeleteRoleDialog";
import { RoleLayout } from "@/components/role/role-layout/RoleLayout"
import { useRole } from "@/hooks"
import CreateRoleFormDrawer from "@/components/role/create-role-form-drawer/CreateRoleFormDrawer";
import { useResource } from "@/hooks/useResources";
import UpdateRoleFormDrawer from "@/components/role/update-role-form-drawer/UpdateRoleFormDrawer";

enum LayoutStates {
    DEFAULT,
    CREATE,
    UPDATE
}

const Role: React.FC = () => {

    const roleHook = useRole(true);
    
    const [currentState, setCurrentState] = useState<LayoutStates>(LayoutStates.DEFAULT);

    const [deleteState, DeleteDisclosure] = useDisclosure();

    const handleCreateEvent = () => { setCurrentState(LayoutStates.CREATE); }

    const handleClose = () => {
        roleHook.clearSelected();
        roleHook.find();
        setCurrentState(LayoutStates.DEFAULT);
    }

    const handleModificationEvent = (index: number) => {
        roleHook.selectItem(index);
        setCurrentState(LayoutStates.UPDATE);
    }

    const handleDeleteEvent = (index: number) => {
        roleHook.selectItem(index);
        DeleteDisclosure.open();
    }

    const view: Record<LayoutStates, React.ReactNode> = {
        [LayoutStates.CREATE]: <CreateRoleFormDrawer onClose={handleClose} />,
        [LayoutStates.UPDATE]: <UpdateRoleFormDrawer onClose={handleClose} role={roleHook.role!} />,
        [LayoutStates.DEFAULT]:
        <>
            <DeleteRoleDialog opened={deleteState} roleIdentify={roleHook.role?.id || -1} onClose={handleClose} />
                <RoleLayout
                    load={roleHook.loading}
                    roles={roleHook.roles}
                    events={{
                        onCreate: handleCreateEvent,
                        onDelete: handleDeleteEvent,
                        onModification: handleModificationEvent,
                    }} />
        </>
    }

    return <>
        {
            view[currentState]
        }
    </>
}

export default Role