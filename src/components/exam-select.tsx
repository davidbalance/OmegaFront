'use client'

import React, { useMemo } from 'react'
import CascadingSelect, { CascadingSelectValue } from './cascading-select'
import { ExamTypeOption } from '@/server/exam_type/server_types'

type ExamSelectProps = Pick<React.ComponentProps<typeof CascadingSelect>, 'onChange'> & {
    options: ExamTypeOption[]
    examTypeValue?: string;
    examSubtypeValue?: string;
    examValue?: string;
    useSubtype?: boolean;
    useExam?: boolean;
}
const ExamSelect: React.FC<ExamSelectProps> = ({
    options,
    examSubtypeValue,
    examTypeValue,
    examValue,
    useSubtype,
    useExam,
    ...props
}) => {

    const defaultType = useMemo(() => options.find(e => e.value === examTypeValue), [options, examTypeValue]);
    const defaultSubtype = useMemo(() => defaultType?.children.find(e => e.value === examSubtypeValue), [defaultType, examSubtypeValue]);
    const defaultExam = useMemo(() => defaultSubtype?.children.find(e => e.value === examValue), [defaultSubtype, examValue]);

    const typeSelectOption = useMemo(() => defaultType
        ? ({ label: defaultType.label, value: defaultType.value, name: 'typeId' })
        : null, [defaultType]);

    const subtypeSelectOption = useMemo(() => useSubtype && defaultSubtype
        ? ({ label: defaultSubtype.label, value: defaultSubtype.value, name: 'subtypeId' })
        : null, [useSubtype, defaultSubtype]);

    const examSelectOption = useMemo(() => useExam && defaultExam
        ? ({ label: defaultExam.label, value: defaultExam.value, name: 'examId' })
        : null, [useExam, defaultExam]);

    const defaultValues: CascadingSelectValue[] = useMemo(
        () => [typeSelectOption, subtypeSelectOption, examSelectOption].filter(e => e !== null) as CascadingSelectValue[],
        [typeSelectOption, subtypeSelectOption, examSelectOption]
    );

    return (
        <CascadingSelect
            options={options}
            maxDepth={useSubtype ? (useExam ? undefined : 2) : 1}
            names={['typeId', 'subtypeId', 'examId']}
            labels={['Tipo de examen', 'Subtipo de exam', 'Examen Medico']}
            placeholders={["Escoge un tipo de examen", "Escoge un subtipo de examen", "Escoge un examen"]}
            defaultValues={defaultValues}
            {...props}
        />
    )
}

export default ExamSelect