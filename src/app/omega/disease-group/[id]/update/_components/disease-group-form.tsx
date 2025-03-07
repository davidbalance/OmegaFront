'use client'

import LoadingOverlay from "@/components/_base/loading-overlay";
import DiseaseGroupForm from "@/components/disease_group/disease-group-form";
import { getErrorMessage } from "@/lib/utils/errors";
import { editDiseaseGroup } from "@/server/disease_group/actions";
import { DiseaseGroup, EditDiseaseGroupPayload } from "@/server/disease_group/server_types";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

type EditDiseaseGroupFormProps = DiseaseGroup;
const EditDiseaseGroupForm: React.FC<EditDiseaseGroupFormProps> = ({
    groupId,
    groupName
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = useCallback(
        async (payload: Omit<EditDiseaseGroupPayload, 'groupId'>) => {
            setLoading(true);
            try {
                await editDiseaseGroup({ ...payload, groupId });
                router.back();
            } catch (error: any) {
                notifications.show({ message: getErrorMessage(error), color: 'red' });
            } finally {
                setLoading(false);
            }
        }, [groupId, router]);

    return (
        <>
            <LoadingOverlay visible={loading} />
            <DiseaseGroupForm
                groupName={groupName}
                onSubmit={handleSubmit}
                loading={loading} />
        </>
    )
}

export default EditDiseaseGroupForm