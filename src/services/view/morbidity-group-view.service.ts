import { IConfigurationService, MorbidityGroupModel } from "..";
import { MorbidityGroupService } from "../api/morbidity-group.service";
import endpoints from "../endpoints/endpoints";

type MorbidityGroupViewConfiguration = {
    groups: MorbidityGroupModel[];
};
export class MorbidityGroupViewService
    implements IConfigurationService<MorbidityGroupViewConfiguration> {

    private readonly groupService = new MorbidityGroupService(endpoints.MORBIDITY_GROUP.V1);

    async initialConfiguration(): Promise<MorbidityGroupViewConfiguration> {
        try {
            const groups = await this.groupService.find();
            return { groups };
        } catch (error) {
            throw error;
        }
    }

    reloadConfiguration(): MorbidityGroupViewConfiguration | Promise<MorbidityGroupViewConfiguration> {
        return this.initialConfiguration();
    }

}