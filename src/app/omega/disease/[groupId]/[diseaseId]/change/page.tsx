import ReturnableHeader from "@/components/_base/returnable-header";
import MoveDiseaseForm from "./_components/move_disease_form";
import { retriveDiseaseGroupOptions } from "@/server/disease_group/actions";

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