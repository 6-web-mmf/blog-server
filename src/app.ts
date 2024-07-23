import { config } from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import { Config } from "./config";
import Routes from "./routes";

config();

export default class Server {
	private readonly app: Application;
	private readonly PORT: number = Number(process.env.PORT) || 8000;
	private readonly configService: Config;

	constructor(app: Application) {
		this.app = app;
		this.configService = new Config();
		this.config();
		new Routes(this.app);
	}

	private config(): void {
		this.app.use(
			cors({
				origin: String(process.env.ALLOWED_HOST),
			})
		);
		this.app.use(express.json());
		this.configService.connectToDB();
	}

	public start(): void {
		this.app.listen(this.PORT, () =>
			console.log(`http://localhost:${this.PORT}`)
		);
	}
}
