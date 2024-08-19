import React from 'react'
import { MedicalResultListRowProps, rowWithMedicalResult } from '../hoc/row-with-medical-result'
import { ListRow } from '@/components/layout/list-layout/components/row/ListRow'

const MedicalResultListRow: React.FC<MedicalResultListRowProps> = rowWithMedicalResult(ListRow);

export default MedicalResultListRow