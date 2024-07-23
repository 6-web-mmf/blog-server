import { jwtDecode } from "jwt-decode";
import { UserDTO } from "../../dto/user.dto";
import { UserService } from "../user.service";
import userRepository from "../../entities/user.entity";

export class UserServiceImpl implements UserService {
	public findCurrentUser(id: string): Promise<UserDTO> {
		throw new Error("Method not implemented.");
	}

	public getCurrentUser = async (token: string): Promise<UserDTO> => {
		const tokenData = this.getData(token);
		const user: any = await userRepository.findById(tokenData.id);
		if (!user) {
			throw new Error("No such user with such token");
		}
		const { password, ...userData } = user._doc;
		return userData;
	};

	private getData = (
		token: string
	): {
		id: string;
		session: number;
		iat: number;
	} => {
		const encoded: string = (token || "").replace(/Bearer\s?/, "");
		const decoded: {
			id: string;
			session: number;
			iat: number;
		} = jwtDecode(encoded);
		return decoded;
	};
}
