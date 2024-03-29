import { IConfigurationService, MorbidityModel, OrderService } from "..";
import { AbstractService } from "../api/abstract.service";
import { MorbidityService } from "../api/morbidity.service";
import { OrderAPI } from "../endpoints/endpoint.type";
import endpoints from "../endpoints/endpoints";

type PatientOrderViewConfiguration = {
    orders: any[];
    morbidities: MorbidityModel[];
}
export class PatientOrderViewService
    implements IConfigurationService<PatientOrderViewConfiguration>{

    private readonly orderService = new OrderService(endpoints.ORDER.V1);
    private readonly morbidityService = new MorbidityService(endpoints.MORBIDITY.V1);

    constructor(private readonly dni: string) { }

    async initialConfiguration(): Promise<PatientOrderViewConfiguration> {
        try {
            const orders = await this.orderService.findByDNI(this.dni);
            const morbidities = await this.morbidityService.find();
            return { orders, morbidities };
        } catch (error) {
            throw error;
        }
    }
    reloadConfiguration(): PatientOrderViewConfiguration | Promise<PatientOrderViewConfiguration> {
        return this.initialConfiguration();
    }
}