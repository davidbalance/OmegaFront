const femoValidator = (metadata: any) => {
    metadata.patient.birthDate = metadata.patient.birthDate ? new Date(metadata.patient.birthDate) : null
    metadata.personalHistory.gynecological.lastMenstruationDate = metadata.personalHistory.gynecological.lastMenstruationDate ? new Date(metadata.personalHistory.gynecological.lastMenstruationDate) : null

    metadata.consultation.work.startDate = metadata.consultation.work.startDate ? new Date(metadata.consultation.work.startDate) : null;
    metadata.consultation.work.returnDate = metadata.consultation.work.returnDate ? new Date(metadata.consultation.work.returnDate) : null;
    metadata.consultation.work.lastDate = metadata.consultation.work.lastDate ? new Date(metadata.consultation.work.lastDate) : null;
    metadata.employmentHistory = metadata.employmentHistory && Array.isArray(metadata.employmentHistory) ?
        metadata.employmentHistory.map((e: any) => ({
            ...e,
            date: e.date ? new Date(e.date) : new Date()
        })) : [];

    metadata.extraLaboralActivities = metadata.extraLaboralActivities && Array.isArray(metadata.extraLaboralActivities) ?
        metadata.extraLaboralActivities.map((e: any) => ({
            ...e,
            date: e.date ? new Date(e.date) : new Date()
        })) : [];

    metadata.examResults.exams = metadata.examResults.exams && Array.isArray(metadata.examResults.exams) ?
        metadata.examResults.exams.map((e: any) => ({
            ...e,
            date: e.date ? new Date(e.date) : new Date()
        })) : [];

    return metadata;
}

export const metadataResponseValidator: Record<string, (metadata: any) => any> = {
    "femo": femoValidator
}