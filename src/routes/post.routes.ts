import { Router } from "express";
import handleValidate from "../validation";
import { PostValidation } from "../validation/post.validation";
import { PostController } from "../controllers/post.controller";
import { tokenRequire } from "../middleware/jwt.middleware";

class PostRoutes {
	private readonly router: Router;
	private readonly controller: PostController;
	private readonly validator: PostValidation;

	constructor() {
		this.router = Router();
		this.controller = new PostController();
		this.validator = new PostValidation();
		this.initializeRoutes();
	}

	private initializeRoutes = (): void => {
		this.router.post(
			"/posts",
			tokenRequire,
			handleValidate,
			this.validator.createValidation,
			this.controller.create
		);
		this.router.get("/posts", this.controller.findAll);
		this.router.get("/posts/:id", this.controller.findById);
		this.router.delete("/posts/:id", tokenRequire, this.controller.delete);
		this.router.patch(
			"/posts/:id",
			tokenRequire,
			handleValidate,
			this.validator.updateValidation,
			this.controller.update
		);
	};

	public get getRouter(): Router {
		return this.router;
	}
}

export default new PostRoutes().getRouter;
