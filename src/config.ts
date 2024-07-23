import mongoose from "mongoose";

export class Config {
	public connectToDB(): void {
		mongoose
			.connect(String(process.env.MONGODB_URI))
			.then(() => console.log("Connected to mongodb"))
			.catch((err) => console.log(err));
	}
}
