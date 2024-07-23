import { UserDTO } from "../dto/user.dto";

export interface AuthResponse {
    user: UserDTO;
	token: string;
}
