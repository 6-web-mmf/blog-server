import { Schema } from "mongoose";

export interface PostDto {
	_id?: string;
	title: string;
	content: string;
	author: string | Schema.Types.ObjectId;
	img: string;
	createdAt?: string;
	updatedAt?: string;
}