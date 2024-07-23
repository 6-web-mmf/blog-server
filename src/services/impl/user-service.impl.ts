import { UserDTO } from "../../dto/user.dto";
import { UserService } from "../user.service";

export class UserServiceImpl implements UserService {
	findCurrentUser(id: string): Promise<UserDTO> {
		throw new Error("Method not implemented.");
	}
}
