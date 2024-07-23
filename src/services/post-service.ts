import { PostDto } from "../dto/post.dto";

export interface PostService {
	findAll(): Promise<PostDto[]>;

	create(dto: PostDto): Promise<PostDto>;

	findById(id: string): Promise<PostDto>;

	delete(id: string): Promise<void>;

	update(id: string, dto: PostDto, token: string): Promise<PostDto>;
}
