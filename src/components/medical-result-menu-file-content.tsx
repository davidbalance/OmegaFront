import { MenuLabel, MenuItem, rem } from '@mantine/core'
import { IconEye, IconUpload } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'
import MedicalResultDownload from './medical-result-download'
import MedicalResultFileDelete from './medical-result-file-delete'

interface MedicalResultMenuFileContentProps {
    id: number;
    hasFile: boolean;
    examName: string;
    editable?: boolean;
}
const MedicalResultMenuFileContent: React.FC<MedicalResultMenuFileContentProps> = ({
    id,
    hasFile,
    examName,
    editable
}) => {
    return (
        <>
            {(editable || hasFile) ? <MenuLabel>Resultado medicos</MenuLabel> : null}
            {hasFile ? (
                <MedicalResultDownload
                    id={id}
                    exam={examName} />
            ) : null}
            {hasFile ? (
                <MenuItem
                    component={Link}
                    href={`/omega/medical/result/${id}/file/view`}
                    leftSection={(
                        <IconEye style={{ width: rem(16), height: rem(16) }} />
                    )}>
                    Visualizar resultado
                </MenuItem>
            ) : null}
            {editable ? (
                <MenuItem
                    component={Link}
                    href={`/omega/medical/result/${id}/file/upload`}
                    leftSection={(
                        <IconUpload style={{ width: rem(16), height: rem(16) }} />
                    )}>
                    Subir resultado
                </MenuItem>
            ) : null}
            {(editable && hasFile) ? (
                <MedicalResultFileDelete id={id} />
            ) : null}
        </>
    )
}

export default MedicalResultMenuFileContent