import { JobPosition } from "./base.response.dto";

export interface JobPositionRequest extends Omit<JobPosition, 'id'> { }