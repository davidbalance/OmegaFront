import { MenuLabel, MenuItem, rem } from '@mantine/core'
import { IconEye, IconUpload } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'
import MedicalResultDownload from './medical-result-download'
import MedicalResultFileDelete from './medical-result-file-delete'

interface ResultMenuProps {
    testId: string;
    hasFile: boolean;
    examName: string;
    editable?: boolean;
}
const ResultMenu: React.FC<ResultMenuProps> = ({
    testId,
    hasFile,
    examName,
    editable
}) => {
    return (
        <>
            {(editable || hasFile) ? <MenuLabel>Resultado medicos</MenuLabel> : null}
            {hasFile ? (
                <MedicalResultDownload
                    id={testId}
                    exam={examName} />
            ) : null}
            {hasFile ? (
                <MenuItem
                    component={Link}
                    href={`/omega/test/${testId}/result/view`}
                    leftSection={(
                        <IconEye style={{ width: rem(16), height: rem(16) }} />
                    )}>
                    Visualizar resultado
                </MenuItem>
            ) : null}
            {editable ? (
                <MenuItem
                    component={Link}
                    href={`/omega/test/${testId}/result/file`}
                    leftSection={(
                        <IconUpload style={{ width: rem(16), height: rem(16) }} />
                    )}>
                    Subir resultado
                </MenuItem>
            ) : null}
            {(editable && hasFile) ? (
                <MedicalResultFileDelete testId={testId} />
            ) : null}
        </>
    )
}

export default ResultMenu