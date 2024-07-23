import { UserDTO } from "../dto/user.dto";

export interface UserService {
	findCurrentUser(id: string): Promise<UserDTO>;
}
