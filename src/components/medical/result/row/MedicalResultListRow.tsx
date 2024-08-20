import React from 'react'
import { MedicalResultListRowProps, withMedicalResult } from '../hoc/with-medical-result'
import { ListRow } from '@/components/layout/list-layout/components/row/ListRow'

const MedicalResultListRow: React.FC<MedicalResultListRowProps> = withMedicalResult(ListRow);

export default MedicalResultListRow