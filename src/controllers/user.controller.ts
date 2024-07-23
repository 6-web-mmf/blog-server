import { Request, Response } from "express";
import { UserServiceImpl } from "../services/impl/user-service.impl";
import { UserService } from "../services/user.service";
import { constants as status } from "http2";
import { getToken } from "../middleware/jwt.middleware";
import { validationResult } from "express-validator";

export class UserController {
	private readonly userService: UserService;

	constructor() {
		this.userService = new UserServiceImpl();
	}

	public update = async (req: Request, res: Response): Promise<void> => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res
					.status(status.HTTP_STATUS_BAD_REQUEST)
					.json({ errors: errors.array() });
				return;
			}
			const user = await this.userService.update(req.body, getToken(req));
			res.status(status.HTTP_STATUS_CREATED).json(user);
		} catch (err: any) {
			res.status(status.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
				errors: [
					{
						msg: err.message,
					},
				],
			});
		}
	};

	public delete = async (req: Request, res: Response): Promise<void> => {
		try {
			await this.userService.delete(getToken(req));
			res
				.status(status.HTTP_STATUS_NO_CONTENT)
				.json({ message: "Post has been deleted" });
		} catch (err: any) {
			res.status(status.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
				errors: [
					{
						msg: err.message,
					},
				],
			});
		}
	};

	public getCurrentUser = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			const user = await this.userService.getCurrentUser(getToken(req));
			if (!user) {
				res.status(status.HTTP_STATUS_UNAUTHORIZED);
			}
			res.status(status.HTTP_STATUS_OK).json(user);
		} catch (err: any) {
			res.status(status.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
				errors: [
					{
						msg: err.message,
					},
				],
			});
		}
	};
}
