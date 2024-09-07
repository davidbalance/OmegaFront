import ReturnableHeader from "@/components/_base/returnable-header";
import Form from "./_components/form";
import { retriveManagements } from "@/server/management.actions";
import { retriveArea } from "@/server/area.actions";

interface OmegaAreaChangePageProps {
    params: { id: number }
}
const OmegaAreaChangePage: React.FC<OmegaAreaChangePageProps> = async ({
    params
}) => {

    const data = await retriveArea(params.id);
    const options = await retriveManagements();

    return (
        <>
            <ReturnableHeader title='Cambiar de grupo' />
            <Form options={options} {...data} />
        </>)
}

export default OmegaAreaChangePage