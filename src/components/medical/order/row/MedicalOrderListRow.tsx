import React from 'react'
import { MedicalOrderListRowProps, rowWithMedicalOrder } from '../hoc/row-with-medical-order'
import { ListRow } from '@/components/layout/list-layout/components/row/ListRow'

const MedicalOrderListRow: React.FC<MedicalOrderListRowProps> = rowWithMedicalOrder(ListRow);

export default MedicalOrderListRow