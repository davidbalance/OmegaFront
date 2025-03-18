import ReturnableHeader from '@/components/_base/returnable-header';
import { retriveCorporativesOptions } from '@/server/corporative/actions';
import { CorporativeOption } from '@/server/corporative/server_types';
import { retriveClientByDni } from '@/server/medical_client/actions';
import React from 'react'
import StepperRetirementRecordForm from './_components/stepper-retirement-record-form';
import PlaceholderForm from './_components/place-holder-form';
import RetirementInstitutionForm from './_components/retirement-institution-form';
import RetirementActivityAndRiskForm from './_components/retirement-activity-and-risk-form';
import MedicalAndSurgicalHistoryForm from '@/components/record/medical-and-surgical-history-form';
import JobAccidentForm from '@/components/record/job-accident-form';
import OccupationalDiseaseForm from '@/components/record/occupational-diseases-form';
import VitalSignsAndAnthropometryForm from '@/components/record/vital-signs-and-anthropometry-form';
import PhysicalRegionalExamForm from '@/components/record/physical-regional-exam-form';
import GeneralExamResultForm from '@/components/record/general-exam-result';
import MedicalDiagnosticForm from '@/components/record/medical-diagnostic-form';
import RetirementEvaluationForm from './_components/retirement-evaluation-form';
import RecommendationForm from '@/components/record/recommendation-form';
import PreviewRetirementRecord from './_components/preview-retirement-record';
import { RetirementRecordPayload } from '@/server/record/create-record/retirement-record';

const testData: RetirementRecordPayload = {
    "patientFirstName": "WILLAN",
    "patientMiddleName": "HERNAN",
    "patientLastName": "FERNANDEZ",
    "patientSecondLastName": "FLORES",
    "patientGender": "male",
    "companyName": "COLEGIO MENOR",
    "companyRUC": "1791754794001",
    "companyCIU": "CIU",
    "institutionHealthFacility": "Omega Salud Ocupacional",
    "workStartDate": new Date("2025-03-15T00:13:58.166Z"),
    "workingTime": 0,
    "workingEndDate": new Date("2025-03-15T00:13:58.166Z"),
    "jobPosition": "GERENTE",
    "institutionActivities": [
        {
            "activity": "SAMPLE",
            "risk": "SAMPLE"
        },
        {
            "activity": "SAMPLE",
            "risk": "SAMPLE"
        },
        {
            "activity": "SAMPLE",
            "risk": "SAMPLE"
        }
    ],
    "medicalAndSurgicalHistory": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec purus ut lacus mollis vestibulum. Morbi sagittis risus sem, nec vestibulum lectus vestibulum in. Praesent iaculis quam nisi, ut ultrices leo volutpat vel. Cras aliquam elit nec neque egestas, a varius lacus cursus. Vestibulum fermentum suscipit lacus eget cursus. Etiam eu molestie mi. Sed non aliquam neque. Aenean pellentesque lorem eleifend egestas tincidunt. Vestibulum eleifend leo id augue commodo gravida. Donec ultrices eros ut ligula dignissim, in ultricies erat pellentesque. Ut accumsan purus a egestas molestie. Nam fringilla a turpis sit amet eleifend.",
    "jobAccidentHappened": true,
    "jobAccidentDate": new Date("2025-03-15T00:16:50.539Z"),
    "jobAccidentDescription": "SAMPLE",
    "jobAccidentObservation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec purus ut lacus mollis vestibulum. Morbi sagittis risus sem, nec vestibulum lectus vestibulum in. Praesent iaculis quam nisi, ut ultrices leo volutpat vel. Cras aliquam elit nec neque egestas, a varius lacus cursus. Vestibulum fermentum suscipit lacus eget cursus. Etiam eu molestie mi. Sed non aliquam neque. Aenean pellentesque lorem eleifend egestas tincidunt. Vestibulum eleifend leo id augue commodo gravida. Donec ultrices eros ut ligula dignissim, in ultricies erat pellentesque. Ut accumsan purus a egestas molestie. Nam fringilla a turpis sit amet eleifend.",
    "occupationalDiseaseHappened": true,
    "occupationalDiseaseDate": new Date("2025-03-15T00:16:57.550Z"),
    "occupationalDiseaseDescription": "SAMPLE",
    "occupationalDiseaseObservation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec purus ut lacus mollis vestibulum. Morbi sagittis risus sem, nec vestibulum lectus vestibulum in. Praesent iaculis quam nisi, ut ultrices leo volutpat vel. Cras aliquam elit nec neque egestas, a varius lacus cursus. Vestibulum fermentum suscipit lacus eget cursus. Etiam eu molestie mi. Sed non aliquam neque. Aenean pellentesque lorem eleifend egestas tincidunt. Vestibulum eleifend leo id augue commodo gravida. Donec ultrices eros ut ligula dignissim, in ultricies erat pellentesque. Ut accumsan purus a egestas molestie. Nam fringilla a turpis sit amet eleifend.",
    "vitalSignsBloodPressure": 0,
    "vitalSignsTemperature": 45,
    "vitalSignsHeartRate": 45,
    "vitalSignsOxygenSaturation": 45,
    "vitalSignsRespiratoryRate": 0,
    "vitalSignsWeight": 45,
    "vitalSignsSize": 0,
    "vitalSignsMassIndex": 45,
    "vitalSignsAbdominalPerimeter": 0,
    "examSkinScar": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "examSkinTattoo": "",
    "examSkinLesions": "",
    "examEyeEyelids": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "examEyeConjunctiva": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "examEyePupils": "",
    "examEyeCorneas": "",
    "examEyeMotility": "",
    "examEarAuditoryExternal": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "examEarAuricle": "",
    "examEarEardrum": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "examPharynxLips": "",
    "examPharynxTongue": "",
    "examPharynxPharynx": "",
    "examPharynxTonsils": "",
    "examPharynxTeeth": "",
    "examNosePartition": "",
    "examNoseTurbinates": "",
    "examNoseMucousMembranes": "",
    "examNoseParanasalSinuses": "",
    "examNeckThyroid": "",
    "examNeckMobility": "",
    "examChestBreast": "",
    "examChestHeart": "",
    "examChestLungs": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "examChestRibCage": "",
    "examAbdomenViscera": "",
    "examAbdomenAbdominalWall": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "examColumnFlexibility": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "examColumnDeviation": "",
    "examColumnPain": "",
    "examPelvis": "",
    "examPelvisGenitals": "",
    "examLimbVascular": "",
    "examLimbUpper": "",
    "examLimbLower": "",
    "examNeurologicForce": "",
    "examNeurologicSensitivity": "",
    "examNeurologicGait": "",
    "examNeurologicReflex": "",
    "generalExamResults": [
        {
            "date": new Date("2025-03-15T00:11:33.422Z"),
            "exam": "SAMPLE",
            "result": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        }
    ],
    "generalExamObservation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec purus ut lacus mollis vestibulum. Morbi sagittis risus sem, nec vestibulum lectus vestibulum in. Praesent iaculis quam nisi, ut ultrices leo volutpat vel. Cras aliquam elit nec neque egestas, a varius lacus cursus. Vestibulum fermentum suscipit lacus eget cursus. Etiam eu molestie mi. Sed non aliquam neque. Aenean pellentesque lorem eleifend egestas tincidunt. Vestibulum eleifend leo id augue commodo gravida. Donec ultrices eros ut ligula dignissim, in ultricies erat pellentesque. Ut accumsan purus a egestas molestie. Nam fringilla a turpis sit amet eleifend.",
    "diagnostics": [
        {
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec purus ut lacus mollis vestibulum. Morbi sagittis risus sem, nec vestibulum lectus vestibulum in. Praesent iaculis quam nisi, ut ultrices leo volutpat vel. Cras aliquam elit nec neque egestas, a varius lacus cursus. Vestibulum fermentum suscipit lacus eget cursus. Etiam eu molestie mi. Sed non aliquam neque. Aenean pellentesque lorem eleifend egestas tincidunt. Vestibulum eleifend leo id augue commodo gravida. Donec ultrices eros ut ligula dignissim, in ultricies erat pellentesque. Ut accumsan purus a egestas molestie. Nam fringilla a turpis sit amet eleifend.",
            "cie": "CIE",
            "pre": true,
            "def": true
        },
        {
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec purus ut lacus mollis vestibulum. Morbi sagittis risus sem, nec vestibulum lectus vestibulum in. Praesent iaculis quam nisi, ut ultrices leo volutpat vel. Cras aliquam elit nec neque egestas, a varius lacus cursus. Vestibulum fermentum suscipit lacus eget cursus. Etiam eu molestie mi. Sed non aliquam neque. Aenean pellentesque lorem eleifend egestas tincidunt. Vestibulum eleifend leo id augue commodo gravida. Donec ultrices eros ut ligula dignissim, in ultricies erat pellentesque. Ut accumsan purus a egestas molestie. Nam fringilla a turpis sit amet eleifend.",
            "cie": "CIE",
            "pre": true,
            "def": false
        },
        {
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec purus ut lacus mollis vestibulum. Morbi sagittis risus sem, nec vestibulum lectus vestibulum in. Praesent iaculis quam nisi, ut ultrices leo volutpat vel. Cras aliquam elit nec neque egestas, a varius lacus cursus. Vestibulum fermentum suscipit lacus eget cursus. Etiam eu molestie mi. Sed non aliquam neque. Aenean pellentesque lorem eleifend egestas tincidunt. Vestibulum eleifend leo id augue commodo gravida. Donec ultrices eros ut ligula dignissim, in ultricies erat pellentesque. Ut accumsan purus a egestas molestie. Nam fringilla a turpis sit amet eleifend.",
            "cie": "CIE",
            "pre": false,
            "def": true
        },
        {
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec purus ut lacus mollis vestibulum. Morbi sagittis risus sem, nec vestibulum lectus vestibulum in. Praesent iaculis quam nisi, ut ultrices leo volutpat vel. Cras aliquam elit nec neque egestas, a varius lacus cursus. Vestibulum fermentum suscipit lacus eget cursus. Etiam eu molestie mi. Sed non aliquam neque. Aenean pellentesque lorem eleifend egestas tincidunt. Vestibulum eleifend leo id augue commodo gravida. Donec ultrices eros ut ligula dignissim, in ultricies erat pellentesque. Ut accumsan purus a egestas molestie. Nam fringilla a turpis sit amet eleifend.",
            "cie": "CIE",
            "pre": false,
            "def": false
        }
    ],
    "retirementDone": true,
    "retirementObservation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec purus ut lacus mollis vestibulum. Morbi sagittis risus sem, nec vestibulum lectus vestibulum in. Praesent iaculis quam nisi, ut ultrices leo volutpat vel. Cras aliquam elit nec neque egestas, a varius lacus cursus. Vestibulum fermentum suscipit lacus eget cursus. Etiam eu molestie mi. Sed non aliquam neque. Aenean pellentesque lorem eleifend egestas tincidunt. Vestibulum eleifend leo id augue commodo gravida. Donec ultrices eros ut ligula dignissim, in ultricies erat pellentesque. Ut accumsan purus a egestas molestie. Nam fringilla a turpis sit amet eleifend.",
    "recommendationDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec purus ut lacus mollis vestibulum. Morbi sagittis risus sem, nec vestibulum lectus vestibulum in. Praesent iaculis quam nisi, ut ultrices leo volutpat vel. Cras aliquam elit nec neque egestas, a varius lacus cursus. Vestibulum fermentum suscipit lacus eget cursus. Etiam eu molestie mi. Sed non aliquam neque. Aenean pellentesque lorem eleifend egestas tincidunt. Vestibulum eleifend leo id augue commodo gravida. Donec ultrices eros ut ligula dignissim, in ultricies erat pellentesque. Ut accumsan purus a egestas molestie. Nam fringilla a turpis sit amet eleifend."
}

type RecordRetirementPageProps = {
    searchParams: { [key: string]: string | string[] | undefined }
}
const RecordRetirementPage: React.FC<RecordRetirementPageProps> = async ({
    searchParams
}) => {
    const patientDni = typeof searchParams.patientDni === 'string' ? searchParams.patientDni : undefined;

    if (!patientDni) return <>Patient not specified</>

    const corporativeBaseOptions = await retriveCorporativesOptions();
    const corporativeOptions = corporativeBaseOptions.map<CorporativeOption>((e) => ({
        ...e,
        children: e.children.map(x => ({
            ...x,
            label: x.label.split('-')[1],
            value: x.label.split('-')[0],
        }))
    }));

    const patient = await retriveClientByDni(patientDni);
    const patientFirstName = patient.patientName.split(' ')[0] ?? '';
    const patientMiddleName = patient.patientName.split(' ')[1] ?? '';
    const patientLastName = patient.patientLastname.split(' ')[0] ?? '';
    const patientSecondLastName = patient.patientLastname.split(' ')[1] ?? '';

    return (
        <>
            <ReturnableHeader title='Ficha de retiro' />
            <StepperRetirementRecordForm
                headers={[
                    { title: 'Datos del establecimiento', description: 'Empresa y Usuario', icon: 'building' },
                    { title: 'Datos del establecimiento', description: 'Actividades y Factores de Riesgo', icon: 'building' },
                    { title: 'Antecedentes personales', description: 'Antecedentes Clinicos y Quirúrgicos', icon: 'user-check' },
                    { title: 'Antecedentes personales', description: 'Accidentes de Trabajo', icon: 'briefcase' },
                    { title: 'Antecedentes personales', description: 'Enfermedades Profesionales', icon: 'briefcase' },
                    { title: 'Constantes Vitales y Antropometria', icon: 'heart' },
                    { title: 'Examen Fisico Regional', description: 'Regiones', icon: 'heart' },
                    { title: 'Resultados de Examenes Generales y Especificos', description: 'Regiones', icon: 'notebook' },
                    { title: 'F. Diagnostico', icon: 'notebook' },
                    { title: 'G. Evaluacion Medica de Retiro', icon: 'notebook' },
                    { title: 'Recomendacionesy/o Tratamientos', icon: 'notebook' },

                    { title: 'Vista anticipada de la ficha', icon: 'check' },
                ]}
                patientDni={patientDni}
                initialData={{
                    ...testData,
                    patientFirstName: patientFirstName,
                    patientMiddleName: patientMiddleName,
                    patientLastName: patientLastName,
                    patientSecondLastName: patientSecondLastName,
                    patientGender: patient.patientGender,
                }}>
                <RetirementInstitutionForm options={corporativeOptions} />
                <RetirementActivityAndRiskForm />
                <MedicalAndSurgicalHistoryForm />
                <JobAccidentForm />
                <OccupationalDiseaseForm />
                <VitalSignsAndAnthropometryForm />
                <PhysicalRegionalExamForm />
                <GeneralExamResultForm />
                <MedicalDiagnosticForm />
                <RetirementEvaluationForm />
                <RecommendationForm />

                <PreviewRetirementRecord />
            </StepperRetirementRecordForm >
        </>
    )
}
export default RecordRetirementPage