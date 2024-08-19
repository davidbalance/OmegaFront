import { ListRow } from '@/components/layout/list-layout/components/row/ListRow'
import React from 'react'
import { PatientListRowProps, rowWithPatient } from '../hoc/row-with-patient'

const PatientListRow: React.FC<PatientListRowProps> = rowWithPatient(ListRow);
export default PatientListRow