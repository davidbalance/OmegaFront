import { useFetch } from '@/hooks/useFetch';
import { Company } from '@/lib/dtos/location/company.response.dto';
import { CorporativeGroup } from '@/lib/dtos/location/corporative/base.response.dto';
import { MedicalResultDiseaseReportRequest } from '@/lib/dtos/medical/result/disease/base.request.dto';
import { MedicalResultDiseaseYear } from '@/lib/dtos/medical/result/disease/base.response.dto';
import { Select, rem, Button, LoadingOverlay, ComboboxItem, Grid } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconFileSpreadsheet } from '@tabler/icons-react';
import React, { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'

interface MedicalDiseaseReportFormProps {
    loading?: boolean;
    onFormSubmitted: (value: MedicalResultDiseaseReportRequest) => void;
}

const MedicalDiseaseReportForm: React.FC<MedicalDiseaseReportFormProps> = ({ onFormSubmitted, loading }) => {

    const [year, setYear] = useState<string | null>(null);
    const [corporativeName, setCorporativeName] = useState<string | null>(null);
    const [companyRuc, setCompanyRuc] = useState<string | null>(null);

    const [companies, setCompanies] = useState<Company[]>([]);

    const {
        data: yearData,
        error: yearError,
        loading: yearLoading,
    } = useFetch<MedicalResultDiseaseYear[]>('/api/medical/results/diseases/year', 'GET');

    const {
        data: corporativeGroupData,
        error: corporativeGroupError,
        loading: corporativeGroupLoading,
    } = useFetch<CorporativeGroup[]>('/api/corporative/groups', 'GET');

    const yearOptions = useMemo(() => yearData?.map(e => `${e.year}`) || [], [yearData]);
    const groupOptions = useMemo(() => corporativeGroupData?.map((e) => ({ value: `${e.id}`, label: e.name })), [corporativeGroupData]);
    const companyOptions = useMemo(() => companies?.map((e) => ({ value: e.ruc, label: e.name })), [companies]);

    const handleYearChange = useCallback((value: string | null) => {
        setYear(value);
    }, []);

    const handleCorporativeGroupChange = useCallback((value: string | null, option: ComboboxItem) => {
        if (!value) { setCompanyRuc(null); }
        else {
            const current = corporativeGroupData?.find(e => e.id === parseInt(value));
            if (current) {
                setCompanies(current.companies);
            }
        }
        setCorporativeName(value);
    }, [corporativeGroupData]);

    const handleCompnayChange = useCallback((value: string | null) => {
        setCompanyRuc(value);
    }, []);

    const handleFormSubmit = useCallback((event: FormEvent<HTMLDivElement>) => {
        event.preventDefault();
        onFormSubmitted({ companyRuc: companyRuc || undefined, corporativeName: corporativeName || undefined, year: year ? parseInt(year) : undefined });
    }, [onFormSubmitted, companyRuc, corporativeName, year]);

    useEffect(() => {
        if (yearError) notifications.show({ message: yearError.message, color: 'red' });
        else if (corporativeGroupError) notifications.show({ message: corporativeGroupError.message, color: 'red' });
    }, [yearError, corporativeGroupError]);

    return (
        <>
            <LoadingOverlay visible={yearLoading || corporativeGroupLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Grid gutter={rem(8)} component='form' onSubmit={handleFormSubmit}>
                <Grid.Col span={4}>
                    <Select
                        value={year}
                        data={yearOptions}
                        checkIconPosition="left"
                        onChange={handleYearChange}
                        label="Año"
                        pb={rem(16)}
                        placeholder="Escoge un año"
                        searchable
                        clearable
                        defaultDropdownOpened={false}
                        nothingFoundMessage="Año no encontrado..."
                        maxDropdownHeight={200}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <Select
                        value={corporativeName}
                        data={groupOptions}
                        checkIconPosition="left"
                        onChange={handleCorporativeGroupChange}
                        label="Grupo corporativo"
                        pb={rem(16)}
                        placeholder="Escoge un grupo corporativo"
                        searchable
                        clearable
                        defaultDropdownOpened={false}
                        nothingFoundMessage="Grupo corporativo no encontrado..."
                        maxDropdownHeight={200}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <Select
                        value={companyRuc}
                        data={companyOptions}
                        checkIconPosition="left"
                        onChange={handleCompnayChange}
                        label="Empresas"
                        pb={rem(16)}
                        placeholder="Escoge una empresa"
                        searchable
                        clearable
                        defaultDropdownOpened={false}
                        nothingFoundMessage="Empresa no encontrada..."
                        maxDropdownHeight={200}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Button
                        type='submit'
                        leftSection={(
                            <IconFileSpreadsheet
                                style={{ width: rem(16), height: rem(16) }}
                                stroke={1.5} />
                        )}
                        fullWidth
                        loading={loading}
                        size='xs'>
                        Exportar
                    </Button>
                </Grid.Col>
            </Grid>
        </>
    )
}

export default MedicalDiseaseReportForm