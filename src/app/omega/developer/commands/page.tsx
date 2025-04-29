import React from 'react'
import CommandResultFileCheckExcel from './_components/command-result-file-check-excel'
import CommandResultFileCheckProcess from './_components/command-result-file-check-process'
import CommandResultFileCheckCount from './_components/command-result-file-check-count'

const OmegaDeveloperCommandsPage: React.FC = () => {
  return (
    <>
      <CommandResultFileCheckProcess />
      <CommandResultFileCheckCount />
      <CommandResultFileCheckExcel />
    </>
  )
}

export default OmegaDeveloperCommandsPage