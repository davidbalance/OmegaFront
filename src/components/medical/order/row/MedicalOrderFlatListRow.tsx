import React from 'react'
import { ListRow } from '@/components/layout/list-layout/components/row/ListRow'
import { MedicalOrderFlatListRowProps, rowWithMedicalOrderFlat } from '../hoc/row-with-medical-order-flat';

const MedicalOrderFlatListRow: React.FC<MedicalOrderFlatListRowProps> = rowWithMedicalOrderFlat(ListRow);

export default MedicalOrderFlatListRow