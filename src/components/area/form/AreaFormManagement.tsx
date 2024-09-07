'use client'

import { Area } from "@/lib/dtos/location/area/base.response.dto";
import { Management } from "@/lib/dtos/location/management/base.response.dto";
import { Box, Button, ComboboxItem, rem, Select } from "@mantine/core";
import React, { useMemo, useState } from "react";

type BaseProps = Omit<React.HTMLProps<HTMLFormElement>, 'ref'> & Pick<Area, 'management'>;
interface AreaFormManagementProps extends BaseProps {
    options: Management[];
}
const AreaFormManagement = React.forwardRef<HTMLFormElement, AreaFormManagementProps>(({
    management,
    options,
    ...props
}, ref) => {

    const [value, setValue] = useState<string>(management.toString(10));

    const managementOptions = useMemo(() => options.map<ComboboxItem>(e => ({ label: e.name, value: e.id.toString(10) })), [options]);

    const handleSelectorChange = (_: any, item: ComboboxItem) => setValue(item.value);

    return (
        <Box
            ref={ref}
            component='form'
            mt={rem(16)}
            px={rem(16)}
            {...props}
        >
            <Select
                name="management"
                value={value}
                label="Gerencias"
                placeholder="Gerencia"
                data={managementOptions}
                allowDeselect={false}
                onChange={handleSelectorChange}
                searchable
                required
            />
            <Button type='submit' style={{ display: 'none' }} />
        </Box>
    )
})

AreaFormManagement.displayName = 'AreaFormManagement';

export default AreaFormManagement