import { Application } from "express";
import authRoutes from "./auth.routes";
import postRoutes from "./post.routes";
import userRoutes from "./user.routes";

export default class Routes {
	constructor(app: Application) {
		app.use(authRoutes, postRoutes, userRoutes);
	}
}
