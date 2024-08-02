import { CommandsMedicalReportGenerateAllPdf } from '@/components/commands/medical/report/CommandsMedicalReportGenerateAllPdf'
import { CommandsMedicalReportGeneratePdfByDni } from '@/components/commands/medical/report/CommandsMedicalReportGeneratePdfByDni'
import ModularLayout from '@/components/modular/layout/ModularLayout'
import { ScrollArea } from '@mantine/core'
import React, { useMemo } from 'react'

const views: Record<string, React.ReactNode> = {
    'generate-all-medical-report-pdf': <CommandsMedicalReportGenerateAllPdf key={1} />,
    'generate-medical-report-pdf-by-dni': <CommandsMedicalReportGeneratePdfByDni key={2} />
}

const DeveloperCommands: React.FC = () => {

    const commandViews = useMemo(() => Object.values(views), []);

    return (
        <ScrollArea h={500}>
            <ModularLayout>
                {commandViews}
            </ModularLayout>
        </ScrollArea>
    )
}

export { DeveloperCommands }