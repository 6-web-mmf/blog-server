import { jwtDecode } from "jwt-decode";
import { UserDTO } from "../../dto/user.dto";
import { UserService } from "../user.service";
import userRepository from "../../entities/user.entity";

export class UserServiceImpl implements UserService {
	public delete = async (token: string): Promise<void> => {
		const user = await this.getCurrentUser(token);
		await userRepository.deleteOne(user);
	};
	public getCurrentUser = async (token: string): Promise<UserDTO> => {
		const tokenData = this.getData(token);
		const user: any = await userRepository.findById(tokenData.id);
		if (!user) {
			throw new Error("No such user with such token");
		}
		const { password, ...userData } = user._doc;		
		return userData;
	};

	public update = async (dto: UserDTO, token: string): Promise<UserDTO> => {
		const user = await this.getCurrentUser(token);
		await userRepository.updateOne(
			{
				_id: user._id,
			},
			dto
		);
		return this.getById(user._id || "");
	};

	private getById = async (id: string): Promise<UserDTO> => {
		const user = await userRepository.findById(id);
		if (!user) {
			throw new Error(`No such user with id: ${id}`);
		}
		return user;
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
