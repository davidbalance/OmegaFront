import { MenuLabel, MenuItem, rem } from '@mantine/core';
import { IconEye, IconPencil, IconUpload } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react'
import MedicalReportDownload from './medical-report-download';

interface ReportMenuProps {
    testId: string;
    examName: string;
    reportHasContent?: boolean;
    editable?: boolean;
}
const ReportMenu: React.FC<ReportMenuProps> = ({
    testId,
    reportHasContent,
    examName,
    editable
}) => {
    return (
        <>
            {(reportHasContent || editable) && <MenuLabel>Reportes medicos</MenuLabel>}
            {editable
                ? <>
                    <MenuItem
                        component={Link}
                        href={`/omega/test/${testId}/report`}
                        leftSection={(
                            <IconPencil style={{ width: rem(16), height: rem(16) }} />
                        )}>
                        Elaborar reporte
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        href={`/omega/test/${testId}/report/file`}
                        leftSection={(
                            <IconUpload style={{ width: rem(16), height: rem(16) }} />
                        )}>
                        Subir reporte
                    </MenuItem>
                </>
                : null}
            {reportHasContent
                ? (<>
                    <MedicalReportDownload
                        testId={testId}
                        examName={examName} />
                    <MenuItem
                        component={Link}
                        href={`/omega/test/${testId}/report/view`}
                        leftSection={(
                            <IconEye style={{ width: rem(16), height: rem(16) }} />
                        )}>
                        Visualizar reporte
                    </MenuItem>
                </>) : null}
        </>
    )
}

export default ReportMenu