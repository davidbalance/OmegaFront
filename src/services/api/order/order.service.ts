import { OrderAPI } from "@/lib/endpoints";
import { IFindService } from "@/services/interfaces";
import { AbstractService } from "../abstract.service";
import { FindOrdersRQ, FindOrdersRS, Order } from "./dtos";
import { OmegaFetch } from "@/services/config";

export class OrderService
    extends AbstractService<OrderAPI>
    implements IFindService<FindOrdersRQ, Order> {
    find(): Order[] | Promise<Order[]>;
    find(params: FindOrdersRQ): Order[] | Promise<Order[]>;
    async find(params?: FindOrdersRQ): Promise<Order[]> {
        if (!params) return [];
        const { dni } = params;
        try {
            const { orders }: FindOrdersRS = await OmegaFetch.get({ url: this.endpoints.FIND_BY_DNI(dni) });
            return orders;
        } catch (error) {
            throw error;
        }
    }

    findOne(params: FindOrdersRQ): Order | Promise<Order> {
        throw new Error("Method not implemented.");
    }
}