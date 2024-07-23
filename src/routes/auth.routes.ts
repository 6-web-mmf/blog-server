import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthValidation } from "../validation/auth.validator";
import handleValidate from "../validation";

class AuthRoutes {
	private readonly router: Router;
	private readonly controller: AuthController;
	private readonly validator: AuthValidation;

	constructor() {
		this.router = Router();
		this.controller = new AuthController();
		this.validator = new AuthValidation();
		this.initializeRoutes();
	}

	private initializeRoutes = (): void => {
		this.router.post(
			"/register",
			handleValidate,
			this.validator.signUpValidation,
			this.controller.register
		);
		this.router.post(
			"/login",
			handleValidate,
			this.validator.signInValidation,
			this.controller.authenticate
		);
	};

	public get getRouter(): Router {
		return this.router;
	}
}

export default new AuthRoutes().getRouter;
