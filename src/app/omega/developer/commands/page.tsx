import React from 'react'
import CommandReportGenerateAll from './_components/command-report-generate-all'
import CommandReportGenerateByDni from './_components/command-report-generate-dni'

const OmegaDeveloperCommandsPage: React.FC = () => {
  return (
    <>
      <CommandReportGenerateAll />
      <CommandReportGenerateByDni />
    </>
  )
}

export default OmegaDeveloperCommandsPage