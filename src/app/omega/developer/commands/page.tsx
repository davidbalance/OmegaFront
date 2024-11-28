import React from 'react'
import CommandReportGenerateAll from './_components/command-report-generate-all'
import CommandReportGenerateByDni from './_components/command-report-generate-dni'
import CommandResultFileCheckExcel from './_components/command-result-file-check-excel'
import CommandResultFileCheckCount from './_components/command-result-file-check-count'

const OmegaDeveloperCommandsPage: React.FC = () => {
  return (
    <>
      <CommandReportGenerateAll />
      <CommandReportGenerateByDni />
      <CommandResultFileCheckCount />
      <CommandResultFileCheckExcel />
    </>
  )
}

export default OmegaDeveloperCommandsPage