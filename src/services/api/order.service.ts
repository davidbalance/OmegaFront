import { FindOrderResponseDTO, IFindService, OrderModel } from "..";
import { OmegaFetch } from "../config";
import { OrderAPI } from "../endpoints/endpoint.type";
import { AbstractService } from "./abstract.service";

export class OrderService
    extends AbstractService<OrderAPI>
    implements IFindService<OrderModel>{

    async find(): Promise<OrderModel[]> {
        try {
            const response = await OmegaFetch.get<{ orders: FindOrderResponseDTO[] }>({ url: this.endpoints.FIND });
            const { orders } = response;
            return orders;
        } catch (error) {
            throw error;
        }
    }

}