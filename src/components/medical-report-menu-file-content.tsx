import { MenuLabel, MenuItem, rem } from '@mantine/core';
import { IconEye, IconPencil, IconUpload } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react'
import MedicalReportDownload from './medical-report-download';

interface MedicalReportMenuFileContentProps {
    examName: string;
    result: number;
    id?: number;
    hasFile?: boolean;
    editable?: boolean;
}
const MedicalReportMenuFileContent: React.FC<MedicalReportMenuFileContentProps> = ({
    id,
    hasFile,
    examName,
    result,
    editable
}) => {
    return (
        <>
            {(hasFile || editable) && <MenuLabel>Reportes medicos</MenuLabel>}
            {editable && (
                <MenuItem
                    component={Link}
                    href={`/omega/medical/result/${result}/report`}
                    leftSection={(
                        <IconPencil style={{ width: rem(16), height: rem(16) }} />
                    )}>
                    Elaborar reporte
                </MenuItem>)}
            {(id && editable) && (
                <MenuItem
                    component={Link}
                    href={`/omega/medical/report/${id}/file/upload`}
                    leftSection={(
                        <IconUpload style={{ width: rem(16), height: rem(16) }} />
                    )}>
                    Subir reporte
                </MenuItem>
            )}
            {(id && hasFile) && (
                <>
                    <MedicalReportDownload
                        id={id}
                        exam={examName} />
                    <MenuItem
                        component={Link}
                        href={`/omega/medical/report/${id}/file/view`}
                        leftSection={(
                            <IconEye style={{ width: rem(16), height: rem(16) }} />
                        )}>
                        Visualizar reporte
                    </MenuItem>
                </>
            )}
        </>
    )
}

export default MedicalReportMenuFileContent