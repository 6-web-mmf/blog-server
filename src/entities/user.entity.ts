import { model, Schema } from "mongoose";
import { UserDTO } from "../dto/user.dto";

const userSchema = new Schema<UserDTO>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		}
	},
	{
		timestamps: true,
	}
);

userSchema.index({ name: "text", email: "text" });

export default model<UserDTO>("Users", userSchema);
