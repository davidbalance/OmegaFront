'use client'

import LoadingOverlay from '@/components/_base/loading-overlay';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { AddMedicalReportPayload } from '@/server/medical_test/server_types';
import { rem, Button } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useRef, useState } from 'react'
import ReportTextArea from '@/components/report_text_area';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { notifications } from '@mantine/notifications';
import { getErrorMessage } from '@/lib/utils/errors';
import { addMedicalReport } from '@/server/medical_test/actions';

interface ReportFormProps extends Partial<Pick<AddMedicalReportPayload, 'content'>> {
    testId: string;
}
const ReportForm: React.FC<ReportFormProps> = ({
    testId,
    content
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const [reportContent, setReportContent] = useState<string>('');

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
        async (event) => {
            event.preventDefault();
            setLoading(true);
            try {
                console.log(reportContent);
                await addMedicalReport({ testId, content: reportContent });
                router.back();
            } catch (error) {
                notifications.show({ message: getErrorMessage(error), color: 'red' });
            } finally {
                setLoading(false);
            }
        }, [router, testId, reportContent]);

    return (
        <>
            <LoadingOverlay visible={loading} />
            <form onSubmit={handleSubmit}>
                <ModularLayout>
                    <ModularBox flex={1}>
                        <ReportTextArea
                            onChange={(e) => setReportContent(e)}
                            content={content} />
                    </ModularBox>
                    <ModularBox>
                        <Button
                            type='submit'
                            fullWidth
                            flex={1}
                            size='xs'
                            leftSection={
                                <IconDeviceFloppy
                                    style={{ width: rem(16), height: rem(16) }}
                                    stroke={1.5}
                                />}>
                            Guardar
                        </Button>
                    </ModularBox>
                </ModularLayout>
            </form>
        </>
    )
}

export default ReportForm