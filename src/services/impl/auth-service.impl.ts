import { IAuthRequest, IRegisterRequest } from "../../types/auth-request.type";
import { AuthResponse } from "../../types/auth-response.type";
import { AuthService } from "../auth.service";
import userRepository from "../../entities/user.entity";
import CryptoJs from "crypto-js";
import jwt from "jsonwebtoken";
import { UserDTO } from "../../dto/user.dto";

export class AuthServiceImpl implements AuthService {
	public authenticate = async (dto: IAuthRequest): Promise<AuthResponse> => {
		const user: any = await userRepository.findOne({
			email: dto.email,
		});
		if (!user) {
			throw new Error(`No such user with email: ${dto.email}`);
		}
		try {
			const decryptedPassword: string = CryptoJs.AES.decrypt(
				String(user.password),
				String(process.env.CRYPTO_SECRET)
			).toString(CryptoJs.enc.Utf8);
			if (decryptedPassword !== dto.password) {
				throw new Error(`Password mismatch`);
			}
			const session: number = Math.random() * 1000;
			const { password, ...data } = user._doc;
			return {
				token: this.generateToken(user, session),
				user: data,
			};
		} catch (e) {
			console.error(e);
			throw new Error(`Something went wrong...`);
		}
	};

	public register = async (dto: IRegisterRequest): Promise<AuthResponse> => {
		const existingUser = await userRepository.findOne({
			email: dto.email,
		});
		if (existingUser) {
			throw new Error("User with such email already exists!");
		}
		const encryptedPassword: string = CryptoJs.AES.encrypt(
			dto.password,
			String(process.env.CRYPTO_SECRET)
		).toString();
		const session: number = Math.random() * 1000;
		try {
			await userRepository.create({
				...dto,
				password: encryptedPassword,
			});
			const newUser: any = await userRepository.findOne({
				email: dto.email,
			});
			if (!newUser) {
				throw new Error("Failed to create user");
			}
			const { password, ...data } = newUser._doc;
			return {
				token: this.generateToken(newUser, session),
				user: data,
			};
		} catch (e) {
			console.error(e);
			throw new Error(`Something went wrong...`);
		}
	};

	private generateToken = (user: UserDTO, session: number) =>
		jwt.sign(
			{
				id: user._id,
				session: session,
			},
			String(process.env.ACCESS_TOKEN_SECRET),
			{
				expiresIn: String(process.env.ACCESS_TOKEN_LIFE),
			}
		);
}
