import ReturnableHeader from "@/components/_base/returnable-header";
import { retriveDisease } from "@/server/disease.actions";
import DiseaseGroupForm from "./_components/disease-group-form";
import { retriveDiseaseOptions } from "@/server/disease-group.actions";

interface OmegaDiseaseChangePageProps {
    params: { id: number }
}
const OmegaDiseaseChangePage: React.FC<OmegaDiseaseChangePageProps> = async ({
    params
}) => {

    const data = await retriveDisease(params.id);
    const options = await retriveDiseaseOptions();

    return (
        <>
            <ReturnableHeader title='Cambiar de grupo' />
            <DiseaseGroupForm options={options} {...data} />
        </>)
}

export default OmegaDiseaseChangePage