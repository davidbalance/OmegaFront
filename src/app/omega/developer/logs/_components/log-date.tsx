'use client'

import { DatePickerInput, DatesRangeValue } from '@mantine/dates'
import dayjs from 'dayjs'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const LogDate = () => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const fromTime: string | null = searchParams.get('fromDate');
    const fromValue: Date = fromTime ? dayjs(Number(fromTime)).toDate() : dayjs().subtract(1, 'day').toDate();

    const toTime: string | null = searchParams.get('toDate');
    const toValue: Date = toTime ? dayjs(Number(toTime)).toDate() : dayjs().toDate();

    const [value, setValue] = useState<[Date | null, Date | null]>([fromValue, toValue]);

    const handleChange = (event: DatesRangeValue) => {
        setValue(event);
        const fromDate = event[0];
        const toDate = event[1];
        if (fromDate && toDate) {
            const newParam = new URLSearchParams(searchParams);
            newParam.set('fromDate', fromDate.getTime().toString());
            newParam.set('toDate', toDate.getTime().toString());
            router.push(`${pathname}?${newParam.toString()}`);
        }
    }


    return (
        <DatePickerInput
            value={value}
            type="range"
            placeholder="Selecciona un rango de fecha"
            onChange={handleChange}
        />
    )
}

export default LogDate