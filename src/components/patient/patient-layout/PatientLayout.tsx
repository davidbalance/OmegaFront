// import { Text, Box, Button, Flex, rem, ActionIcon, Title } from '@mantine/core';
// import React, { useMemo, useState } from 'react'
// import { Patient } from '@/services/api/patient/dtos';
// import { User } from '@/services/api/user/dtos';
// import MultipleTierLayout, { TierElement } from '@/components/layout/multiple-tier-layout/MultipleTierLayout';
// import { IconDotsVertical, IconFolder } from '@tabler/icons-react';
// import { ListLayout } from '@/components/layout/list-layout/ListLayout';
// import { ListRowElement } from '@/components/layout/list-layout/ListRowElement';

// type PatientLayoutDataType = Omit<Patient, 'user'> & Omit<User, 'id'>;
// const parsePatient = (medicalResults: Patient[]): PatientLayoutDataType[] => medicalResults.map<PatientLayoutDataType>((e) => ({
//     id: e.id,
//     dni: e.user.dni,
//     name: e.user.name,
//     lastname: e.user.lastname,
//     email: e.user.email,
//     birthday: e.birthday,
//     gender: e.gender
// }));

// interface ListElement<T> {
//     key: keyof T;
//     name: string;
// }

// interface PatientLayoutProps {
//     data: any[];
// }

// type TestType = { sample: string, sample2: string, sample3: string };

// const PatientLayout: React.FC<PatientLayoutProps> = ({ data }) => {

//     const [active, setActive] = useState(0);
//     const columns = useMemo((): ListElement<TestType>[] => [{ key: 'sample', name: 'Col 1' }, { key: 'sample2', name: 'Col 2' }, { key: 'sample3', name: 'Col 3' }], []);

//     const handleRows = (row: TestType) => <ListRowElement<TestType>
//         key={row.sample}
//         leftSection={<IconFolder style={{ width: rem(20), height: rem(20) }} />}
//         rightSection={<ActionIcon variant='transparent'><IconDotsVertical style={{ width: rem(20), height: rem(20) }} /></ActionIcon>}
//         onClick={() => { }}>

//         <Title order={6}>{row.sample}</Title>
//         <Flex direction='row' justify='space-between'>
//             <Text>{row.sample2}</Text>
//             <Text>{row.sample3}</Text>
//         </Flex>
//     </ListRowElement>

//     const handleNextTier = () => {
//         setActive(prev => prev + 1);
//     }

//     const multipleLayer = useMemo((): TierElement[] => [
//         {
//             title: 'Pacientes',
//             element: <ListLayout<TestType>
//                 data={[{ sample: '1', sample2: '2', sample3: '5' }, { sample: '2', sample2: '2', sample3: '3' }, { sample: '7', sample2: '2', sample3: '3' }, { sample: '4', sample2: '2', sample3: '3' }, { sample: '5', sample2: '2', sample3: '3' }, { sample: '6', sample2: '2', sample3: '3' }]}
//                 columns={columns}
//                 leftSection={true}
//                 rightSection={true}
//                 rows={handleRows} />
//         },
//         {
//             title: 'Ordenes',
//             element: <Box key={2}><Text>Tier 2</Text><Button onClick={handleNextTier}>NextTier</Button></Box>,
//         },
//         {
//             title: 'Resultados',
//             element: <Box key={3}><Text>Tier 3</Text></Box>
//         },

//     ], []);

//     const handleCloseTier = () => {
//         setActive(prev => prev - 1);
//     }

//     return (
//         <>
//             <MultipleTierLayout
//                 elements={multipleLayer}
//                 tier={active}
//                 onClose={handleCloseTier} />
//         </>
//     )
// }

// export { PatientLayout }