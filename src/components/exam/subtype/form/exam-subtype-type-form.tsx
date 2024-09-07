import { Box, Button, ComboboxItem, rem, Select } from '@mantine/core'
import React, { useMemo, useState } from 'react'
import { ExamType } from '@/lib/dtos/laboratory/exam/type/base.response.dto'

interface ExamSubtypeTypeFormProps extends Omit<React.HTMLProps<HTMLFormElement>, 'ref' | 'type'> {
    type: number;
    options: ExamType[]
}

const ExamSubtypeTypeForm = React.forwardRef<HTMLFormElement, ExamSubtypeTypeFormProps>(({
    options,
    type,
    ...props
}, ref) => {

    const [value, setValue] = useState(type.toString(10));

    const examtypeOptions = useMemo(() => options.map(e => ({ value: e.id.toString(10), label: e.name })), [options]);

    const handleChangeEvent = (_: any, item: ComboboxItem) => {
        setValue(item.value);
    }

    return (
        <Box
            ref={ref}
            component='form'
            mt={rem(16)}
            px={rem(16)}
            {...props}>
            <Select
                name='type'
                value={value}
                data={examtypeOptions}
                checkIconPosition="left"
                onChange={handleChangeEvent}
                label="Tipos de examenes"
                pb={rem(16)}
                placeholder="Escoge un tipo de examen"
                searchable
                defaultDropdownOpened={false}
                nothingFoundMessage=""
                allowDeselect={false}
                maxDropdownHeight={200} />

            <Button type='submit' style={{ display: 'none' }} />

        </Box>
    )
});

export default ExamSubtypeTypeForm;