import { UserDTO } from "../dto/user.dto";

export interface UserService {
	getCurrentUser(token: string): Promise<UserDTO>;

	update(dto: UserDTO, token: string): Promise<UserDTO>;

	delete(token: string): Promise<void>;
}
