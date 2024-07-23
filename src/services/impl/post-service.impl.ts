import { PostDto } from "../../dto/post.dto";
import { PostService } from "../post-service";
import postRepository from "../../entities/post.entity";
import { UserService } from "../user.service";
import { UserServiceImpl } from "./user-service.impl";

export class PostServiceImpl implements PostService {
	private readonly userService: UserService;

	constructor() {
		this.userService = new UserServiceImpl();
	}

	public create = async (dto: PostDto, token: string): Promise<PostDto> => {
		await postRepository.create({
			...dto,
			author: await this.userService.getCurrentUser(token),
		});
		const post = await postRepository.findOne({
			title: dto.title,
		});
		if (!post) {
			throw new Error("Something went wrong...");
		}
		return post;
	};

	public findAll = async (): Promise<PostDto[]> => {
		return postRepository.find();
	};

	public findById = async (id: string): Promise<PostDto> => {
		const post = await postRepository.findById(id);
		if (!post) {
			throw new Error(`No such post with id: ${id}`);
		}
		return post;
	};

	public update = async (
		id: string,
		dto: PostDto,
		token: string
	): Promise<PostDto> => {
		const post = await this.findById(id);
		const creator = await this.userService.getCurrentUser(token);
		if (creator._id?.toString() === post.author.toString()) {
			await postRepository.updateOne(
				{
					_id: id,
				},
				dto
			);
		} else {
			throw new Error("Only the creator of a post can update it");
		}
		return this.findById(id);
	};

	public delete = async (id: string, token: string): Promise<void> => {
		const post = await this.findById(id);
		const creator = await this.userService.getCurrentUser(token);
		if (creator._id?.toString() === post.author.toString()) {
			await postRepository.deleteOne(post);
		} else {
			throw new Error("Only the creator of a post can delete it");
		}
	};
}
