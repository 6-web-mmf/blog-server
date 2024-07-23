import { PostDto } from "../dto/post.dto";

export interface PostService {
	findAll(): Promise<PostDto[]>;

	create(dto: PostDto, token: string): Promise<PostDto>;

	findById(id: string): Promise<PostDto>;

	delete(id: string, token: string): Promise<void>;

	update(id: string, dto: PostDto, token: string): Promise<PostDto>;
}
