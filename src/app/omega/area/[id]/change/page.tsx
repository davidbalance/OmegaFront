import ReturnableHeader from "@/components/_base/returnable-header";
import ChangeManagementForm from "./_components/change-management-form";
import { retriveArea } from "@/server/area.actions";
import { retriveManagementOptions } from "@/server/management.actions";

interface OmegaAreaChangePageProps {
    params: { id: number }
}
const OmegaAreaChangePage: React.FC<OmegaAreaChangePageProps> = async ({
    params
}) => {

    const options = await retriveManagementOptions();
    const data = await retriveArea(params.id);

    return (
        <>
            <ReturnableHeader title='Cambiar de grupo' />
            <ChangeManagementForm options={options} {...data} />
        </>)
}

export default OmegaAreaChangePage