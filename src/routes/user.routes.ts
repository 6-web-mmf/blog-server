import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { tokenRequire } from "../middleware/jwt.middleware";
import { AuthValidation } from "../validation/auth.validator";
import handleValidate from "../validation";

class UserRoutes {
	private readonly router: Router;
	private readonly controller: UserController;
	private readonly validation: AuthValidation;

	constructor() {
		this.router = Router();
		this.controller = new UserController();
		this.validation = new AuthValidation();
		this.initializeRoutes();
	}

	private initializeRoutes = (): void => {
		this.router.get("/users", tokenRequire, this.controller.getCurrentUser);
		this.router.patch(
			"/users",
			tokenRequire,
			handleValidate,
			this.validation.signInValidation,
			this.controller.update
		);
		this.router.delete("/users", tokenRequire, this.controller.delete);
	};

	public get getRouter(): Router {
		return this.router;
	}
}

export default new UserRoutes().getRouter;
