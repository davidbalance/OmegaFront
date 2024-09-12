import ReturnableHeader from '@/components/_base/returnable-header'
import { ModularBox } from '@/components/modular/box/ModularBox'
import React from 'react'
import FileUploadForm from './_components/file-upload-form'

interface MedicalResultFileUploadProps {
  params: { id: number }
}
const MedicalResultFileUpload: React.FC<MedicalResultFileUploadProps> = ({ params }) => {
  return (
    <>
      <ReturnableHeader title='Carga de resultado medico' />
      <ModularBox
        h='100%'
        justify='center'
        flex={1}>
        <FileUploadForm id={params.id} />
      </ModularBox>
    </>
  )
}

export default MedicalResultFileUpload