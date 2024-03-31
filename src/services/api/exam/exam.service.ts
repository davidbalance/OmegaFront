import { ExamAPI, ISelectorService } from "@/services";
import { AbstractService } from "../abstract.service";
import { SelectorOption } from "@/lib";
import { OmegaFetch } from "@/services/config";
import { FindExamSelectorOptions } from "./dtos";

export class ExamService
    extends AbstractService<ExamAPI>
    implements ISelectorService<any, number> {

    async findSelectorOptions(params?: any): Promise<SelectorOption<number>[]> {
        try {
            const { options }: FindExamSelectorOptions = await OmegaFetch.get({
                url: this.endpoints.FIND
            });
            return options;
        } catch (error) {
            throw error;
        }
    }
}