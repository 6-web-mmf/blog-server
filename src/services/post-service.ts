import { PostDto } from "../dto/post.dto";

export interface PostService {
	findAll(): Promise<PostDto[]>;

	findById(id: string): Promise<PostDto>;
}
