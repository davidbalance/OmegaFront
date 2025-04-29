import ReturnableHeader from "@/components/_base/returnable-header";
import MoveDiseaseForm from "./_components/move-disease-form";
import { retriveDiseaseGroupOptions } from "@/server";

interface OmegaDiseaseChangePageProps {
    params: {
        groupId: string;
        diseaseId: string;
    }
}
const OmegaDiseaseChangePage: React.FC<OmegaDiseaseChangePageProps> = async ({
    params
}) => {

    const options = await retriveDiseaseGroupOptions();

    return (
        <>
            <ReturnableHeader title='Cambiar de grupo' />
            <MoveDiseaseForm
                diseaseId={params.diseaseId}
                fromGroupId={params.groupId}
                options={options} />
        </>)
}

export default OmegaDiseaseChangePage