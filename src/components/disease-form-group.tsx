'use client'

import { Disease } from "@/lib/dtos/disease/base.response.dto";
import { DiseaseGroup } from "@/lib/dtos/disease/group/base.response.dto";
import { Box, Button, ComboboxItem, rem, Select } from "@mantine/core";
import React, { useMemo, useState } from "react";

type FormPropBase = Omit<Disease, 'name' | 'id'> & React.HTMLProps<HTMLFormElement>;
export interface DiseaseFormGroupProps extends FormPropBase {
    options: DiseaseGroup[];
};
const DiseaseFormGroup = React.forwardRef<HTMLFormElement, DiseaseFormGroupProps>(({
    group,
    options,
    onSubmit
}, ref) => {

    const [currentValue, setCurrentValue] = useState<string>(group.toString());

    const groupOptions = useMemo(() => options.map(e => ({ value: e.id.toString(), label: e.name })), [options]);

    const handleChangeEvent = (_: any, item: ComboboxItem) => {
        setCurrentValue(item.value);
    }

    return (
        <Box
            ref={ref}
            component='form'
            mt={rem(16)}
            px={rem(16)}
            onSubmit={onSubmit}>
            <Select
                name="group"
                value={currentValue}
                onChange={handleChangeEvent}
                label="Grupo de morbilidades"
                placeholder="Grupo"
                data={groupOptions}
                allowDeselect={false}
                searchable
            />
            <Button type='submit' style={{ display: 'none' }} />
        </Box>
    )
})

DiseaseFormGroup.displayName = 'DiseaseFormGroup';

export default DiseaseFormGroup