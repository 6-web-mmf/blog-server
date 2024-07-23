import { Application } from "express";
import authRoutes from "./auth.routes";
import postRoutes from "./post.routes";

export default class Routes {
	constructor(app: Application) {
		app.use(authRoutes, postRoutes);
	}
}
