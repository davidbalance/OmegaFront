import React from 'react'
import CommandReportGenerateAll from './_components/command-report-generate-all'
import CommandReportGenerateByDni from './_components/command-report-generate-dni'
import CommandResultFileCheck from './_components/command-result-file-check'

export const dynamic = 'force-dynamic'
const OmegaDeveloperCommandsPage: React.FC = () => {
  return (
    <>
      <CommandReportGenerateAll />
      <CommandReportGenerateByDni />
      <CommandResultFileCheck />
    </>
  )
}

export default OmegaDeveloperCommandsPage