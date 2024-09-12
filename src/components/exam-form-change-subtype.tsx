import { Box, Button, ComboboxItem, rem, Select } from '@mantine/core'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ExamTypeOption } from '@/lib/dtos/laboratory/exam/type/base.response.dto'
import { Exam } from '@/lib/dtos/laboratory/exam/base.response.dto';

const CustomSelect = ({ onChange, ...props }: {
    value: string | null;
    data: { label: string, value: string }[];
    nothingFoundMessage: string;
    label: string;
    placeholder: string;
    name: string;
    onChange: (option: ComboboxItem) => void;
}) => {
    return (
        <Select
            checkIconPosition="left"
            pb={rem(16)}
            searchable
            defaultDropdownOpened={false}
            allowDeselect={false}
            maxDropdownHeight={200}
            onChange={(_, value) => onChange(value)}
            {...props}
        />
    );
}


type FormProps = Omit<React.HTMLProps<HTMLFormElement>, 'ref'> & Pick<Exam, 'subtype'>
interface ExamFormChangeSubtypeProps extends FormProps {
    options: ExamTypeOption[];
}

const ExamFormChangeSubtype = React.forwardRef<HTMLFormElement, ExamFormChangeSubtypeProps>(({
    subtype,
    options,
    ...props
}, ref) => {

    const [typeValue, setTypeValue] = useState<ExamTypeOption | null>(null);
    const [value, setValue] = useState<string | null>(null);

    const handleChangeEventType = useCallback((option: ComboboxItem) => {
        setTypeValue(options.find(e => e.id === Number(option.value)) || null);
        setValue(null);
    }, [options]);

    const handleChangeEventSubtype = useCallback((option: ComboboxItem) => {
        setValue(option.value);
    }, []);

    const typeOptions = useMemo(() => options.map(e => ({ value: e.id.toString(10), label: e.name })), [options]);
    const subtypeOptions = useMemo(() => typeValue?.subtypes.map(e => ({ value: e.id.toString(10), label: e.name })) || [], [typeValue]);

    useEffect(() => {
        for (const type of options) {
            for (const curr of type.subtypes) {
                if (curr.id === subtype) {
                    setTypeValue(type);
                    setValue(curr.id.toString(10));
                    return;
                }
            }
        }
    }, [options, subtype]);


    return (
        <Box
            ref={ref}
            component='form'
            mt={rem(16)}
            px={rem(16)}
            {...props}>
            <CustomSelect
                name='type'
                value={typeValue?.id.toString() || null}
                data={typeOptions}
                onChange={handleChangeEventType}
                label="Tipos de examenes"
                placeholder="Escoge un tipo de examen"
                nothingFoundMessage="Tipo de examenes no encontrados" />
            <CustomSelect
                name='subtype'
                value={value}
                data={subtypeOptions}
                onChange={handleChangeEventSubtype}
                label="Subtipos de examenes"
                placeholder="Escoge un subtipo de examen"
                nothingFoundMessage="Subtipo de examen no encontrado"
            />

            <Button type='submit' style={{ display: 'none' }} />

        </Box>
    )
});

ExamFormChangeSubtype.displayName = 'ExamFormChangeSubtype'

export default ExamFormChangeSubtype;