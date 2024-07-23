import { PostDto } from "../../dto/post.dto";
import { PostService } from "../post-service";

export class PostServiceImpl implements PostService {
	findAll(): Promise<PostDto[]> {
		throw new Error("Method not implemented.");
	}
	findById(id: string): Promise<PostDto> {
		throw new Error("Method not implemented.");
	}
}
