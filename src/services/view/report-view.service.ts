import { IConfigurationService } from ".."
import { ResultService } from "../api/result.service"
import endpoints from "../endpoints/endpoints"

type ReportViewConfiguration = {
    results: any[]
}
export class ReportViewService
    implements IConfigurationService<ReportViewConfiguration>{

    private readonly resultService = new ResultService(endpoints.RESULT.V1);

    async initialConfiguration(): Promise<ReportViewConfiguration> {
        try {
            const results = await this.resultService.find();
            return { results };
        } catch (error) {
            throw error
        }
    }
    reloadConfiguration(): ReportViewConfiguration | Promise<ReportViewConfiguration> {
        return this.initialConfiguration();
    }

}