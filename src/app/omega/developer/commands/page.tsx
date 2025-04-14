import React from 'react'
import CommandResultFileCheckExcel from './_components/command_result_file_check_excel'
import CommandResultFileCheckProcess from './_components/command_result_file_check_process'
import CommandResultFileCheckCount from './_components/command_result_file_check_count'

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