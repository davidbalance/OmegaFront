'use client'

import React from 'react'
import { CertificateRecordPayload } from '@/server/record/create-record/certificate-record';
import CertificateRetirementEvaluationForm from './certificate-retirement-evaluation';
import MedicalFitnessForJobForm from '@/components/record/medical-fitness-for-job-form';
import MedicalFitnessForJobSchema from '@/components/record/schemas/medical-fitness-for-job.schema';
import CertificateRetirementEvaluationSchema from '../_schemas/certificate-retirement-evaluation.schema'
import { z } from 'zod';

type CertificateEvaluationProps = {
    data?: Partial<CertificateRecordPayload>,
    onSubmit?: (value: z.infer<typeof MedicalFitnessForJobSchema> | z.infer<typeof CertificateRetirementEvaluationSchema>) => void;
}
const CertificateEvaluation = React.forwardRef<HTMLFormElement, CertificateEvaluationProps>(({ ...props }, ref) => {

    return <>
        {props.data?.generalData === 'retirement'
            ? <CertificateRetirementEvaluationForm key="retirement" {...props} ref={ref} />
            : <MedicalFitnessForJobForm
                key="medical-form"
                {...props}
                ref={ref}
                unhideObservation
                hideLimitation />}
    </>
});

CertificateEvaluation.displayName = 'CertificateEvaluation';

export default CertificateEvaluation