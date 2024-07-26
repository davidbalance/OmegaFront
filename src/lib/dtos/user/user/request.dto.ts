import { UserRequestDto } from "./base.request.dto";

export interface PostUserRequestDto extends UserRequestDto { }

export interface PatchUserRequestDto extends Partial<UserRequestDto> { }