import { OmegaWebResource } from "./base.response.dto";

export interface OmegaWebResourceRequest extends Omit<OmegaWebResource, 'id' | 'status'> { }