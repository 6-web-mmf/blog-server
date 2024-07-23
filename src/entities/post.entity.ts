import { model, Schema } from "mongoose";
import { PostDto } from "../dto/post.dto";

const userSchema = new Schema<PostDto>(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "Users",
		},
		img: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.index({ name: "text", email: "text" });

export default model<PostDto>("Posts", userSchema);