import { Response, Request } from "express";
import { AuthService } from "../services/auth.service";
import { AuthServiceImpl } from "../services/impl/auth-service.impl";
import { constants as status } from "http2";
import { validationResult } from "express-validator";

export class AuthController {
	private readonly authService: AuthService;

	constructor() {
		this.authService = new AuthServiceImpl();
	}

	public register = async (req: Request, res: Response): Promise<void> => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res
					.status(status.HTTP_STATUS_BAD_REQUEST)
					.json({ errors: errors.array() });
			}
			const data = await this.authService.register(req.body);
			res.status(status.HTTP_STATUS_CREATED).json(data);
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

	public authenticate = async (req: Request, res: Response): Promise<void> => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res
					.status(status.HTTP_STATUS_BAD_REQUEST)
					.json({ errors: errors.array() });
			}
			const data = await this.authService.authenticate(req.body);
			res.status(status.HTTP_STATUS_CREATED).json(data);
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
