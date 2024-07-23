import { UserDTO } from "../dto/user.dto";
import { IAuthRequest, IRegisterRequest } from "../types/auth-request.type";
import { AuthResponse } from "../types/auth-response.type";

export interface AuthService {
	authenticate(dto: IAuthRequest): Promise<AuthResponse>;
	register(dto: IRegisterRequest): Promise<AuthResponse>;
}
