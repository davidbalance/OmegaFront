import { MenuLabel, MenuItem, rem } from '@mantine/core';
import { IconEye } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react'
import MedicalReportDownload from './medical-report-download';

interface MedicalReportMenuFileContentProps {
    id: number;
    hasFile: boolean;
    examName: string;
    editable?: boolean;
}
const MedicalReportMenuFileContent: React.FC<MedicalReportMenuFileContentProps> = ({
    id,
    hasFile,
    examName,
    editable
}) => {
    return (
        <>
            {(hasFile || editable) && <MenuLabel>Reportes medicos</MenuLabel>}
            {hasFile && (
                <MedicalReportDownload
                    id={id}
                    exam={examName} />
            )}
            {hasFile && (
                <MenuItem
                    component={Link}
                    href={`/omega/medical/report/${id}/file/view`}
                    leftSection={(
                        <IconEye style={{ width: rem(16), height: rem(16) }} />
                    )}>
                    Visualizar reporte
                </MenuItem>
            )}
        </>
    )
}

export default MedicalReportMenuFileContent