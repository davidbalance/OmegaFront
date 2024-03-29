import { IConfigurationService, MorbidityGroupModel, MorbidityModel } from "..";
import { MorbidityGroupService } from "../api/morbidity-group.service";
import { MorbidityService } from "../api/morbidity.service";
import endpoints from "../endpoints/endpoints";

type MorbidityViewConfiguration = {
    morbidities: MorbidityModel[];
    groups: MorbidityGroupModel[];
}
export class MorbidityViewService
    implements IConfigurationService<MorbidityViewConfiguration> {

    private readonly groupService = new MorbidityGroupService(endpoints.MORBIDITY_GROUP.V1);
    private readonly morbityService = new MorbidityService(endpoints.MORBIDITY.V1);

    async initialConfiguration(): Promise<MorbidityViewConfiguration> {
        try {
            const morbidities = await this.morbityService.find();
            const groups = await this.groupService.find();
            return { morbidities, groups };
        } catch (error) {
            throw error;
        }
    }

    reloadConfiguration(): MorbidityViewConfiguration | Promise<MorbidityViewConfiguration> {
        return this.initialConfiguration();
    }
}