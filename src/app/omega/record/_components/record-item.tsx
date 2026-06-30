import React from 'react'
import { Box, Flex, MenuItem, MenuLabel, rem, Text } from '@mantine/core'
import { ClientRecord, RECORD_STATUS_COMPLETED } from '@/server/record/server-types'
import dayjs from 'dayjs'
import Title from '@/components/_base/mantine/title'
import ListRow from '@/components/_base/list/list-row'
import RecordDownload from './record-download'
import ActionMenu from '@/components/_base/action-menu'
import ActionMenuProvider from '@/contexts/action-menu.context'
import Link from 'next/link'
import { IconEdit, IconEye, IconNotebook } from '@tabler/icons-react'
import { UpdateCertificateKey, UpdateFemoKey } from '@/types/update-record.type'
import MenuActionCreateCertificate from './menu-action-create-certificate'

const v2MenuItems: Record<string,
    Partial<Record<UpdateCertificateKey | UpdateFemoKey, string>>
> = {
    "femo": {
        // "consultation": "Motivo de Consulta",
        // "current-disease": "Enfermedad o Problema Actual",
        "vital-signs": "Constantes Vitales y Antropometría",
        // "physical-exam": "Examen Físico Regional",
        // "risk-factor": "Factores de Riesgo del Trabajo Actual",
        // "employement-history": "Actividad Laboral/Incidentes/Accidentes/Enfermedades Ocupaciones",
        // "extra-laboral-activity": "Actividades extra laborales",
        // "exam-result": "Resultados de Exámenes Generales y Específicos",
        // "diagnoses": "Diagnostico",
        // "medical-fitness": "Aptitud Médica para el Trabajo",
        // "retirement": "Retiro",
        // "recommendation": "Recomendaciones y/o Tratamiento",
    },
}

const ActionButtonsV2: React.FC<{ id: string, name: string }> = ({ id, name }) => {
    if (!(name in v2MenuItems)) return null;
    const items = v2MenuItems[name];

    const entries = Object.entries(items);

    return (<>
        {entries.length > 0 && <MenuLabel>Modificación de Ficha</MenuLabel>}
        {entries.map(([key, value]) => (
            <MenuItem
                key={key}
                component={Link}
                href={{
                    pathname: `record/update/${id}`,
                    query: {
                        "record": name,
                        "type": key
                    }
                }}
                leftSection={(
                    <IconEdit style={{ width: rem(16), height: rem(16) }} />
                )}>
                {value}
            </MenuItem>
        ))}
    </>)
}

type RecordItemActionButtonProps = {
    recordId: string,
    recordName: string,
    version: string
    status: string
}
const RecordItemActionButton: React.FC<RecordItemActionButtonProps> = ({
    recordId,
    recordName,
    version,
    status
}) => {

    return (
        <ActionMenuProvider>
            <ActionMenu>
                {status === RECORD_STATUS_COMPLETED && (
                    <>
                        <MenuLabel>Archivo</MenuLabel>
                        <RecordDownload
                            recordId={recordId}
                            recordName={recordName} />
                        <MenuItem
                            component={Link}
                            href={`/omega/record/${recordId}/file/view`}
                            leftSection={(
                                <IconEye style={{ width: rem(16), height: rem(16) }} />
                            )}>
                            Visualizar resultado
                        </MenuItem>
                    </>
                )}
                {recordName === "femo" && (
                    <>
                        <MenuLabel>Certificado</MenuLabel>
                        <MenuActionCreateCertificate recordId={recordId} />
                    </>
                )}
                {status !== RECORD_STATUS_COMPLETED && (
                    <>
                        <MenuLabel>Revisión</MenuLabel>
                        <MenuItem
                            component={Link}
                            href={`record/review/${recordId}/${recordName}`}
                            leftSection={(
                                <IconNotebook style={{ width: rem(16), height: rem(16) }} />
                            )}>
                            Revisar y Aprobar
                        </MenuItem>
                        {version === "v2" && <ActionButtonsV2 id={recordId} name={recordName} />}
                    </>
                )}
            </ActionMenu>
        </ActionMenuProvider>)
}

type RecordItemProps = ClientRecord;
const RecordItem: React.FC<RecordItemProps> = async ({
    recordId,
    recordName,
    recordVersion,
    recordEmissionDate,
    recordStatus
}) => {
    return (
        <ListRow hoverable>
            <Flex
                component='div'
                justify='space-between'
                align='center'>
                <Box component='div'>
                    <Title order={6}>{`${recordName.slice(0, 1).toUpperCase()}${recordName.slice(1)}`}</Title>
                    <Text>{dayjs(recordEmissionDate).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    {recordStatus !== RECORD_STATUS_COMPLETED && <Text c="red">Falta aprobación</Text>}
                </Box>
                <RecordItemActionButton
                    recordId={recordId}
                    recordName={recordName}
                    version={recordVersion}
                    status={recordStatus} />
            </Flex>
        </ListRow>
    )
}

export default RecordItem