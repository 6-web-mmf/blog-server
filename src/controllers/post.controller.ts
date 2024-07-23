import { Request, Response } from "express";
import { PostServiceImpl } from "../services/impl/post-service.impl";
import { PostService } from "../services/post-service";
import { constants as status } from "http2";
import { validationResult } from "express-validator";
import { getToken } from "../middleware/jwt.middleware";

export class PostController {
	private readonly postService: PostService;

	constructor() {
		this.postService = new PostServiceImpl();
	}

	public create = async (req: Request, res: Response): Promise<void> => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res
					.status(status.HTTP_STATUS_BAD_REQUEST)
					.json({ errors: errors.array() });
			}
			const data = await this.postService.create(req.body);
			res.status(status.HTTP_STATUS_CREATED).json(data);
		} catch (err: any) {
			res.status(status.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
				errors: [
					{
						msg: err.message,
					},
				],
			});
		}
	};

	public findById = async (req: Request, res: Response): Promise<void> => {
		try {
			const data = await this.postService.findById(req.params.id);
			res.status(status.HTTP_STATUS_OK).json(data);
		} catch (err: any) {
			res.status(status.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
				errors: [
					{
						msg: err.message,
					},
				],
			});
		}
	};

	public findAll = async (req: Request, res: Response): Promise<void> => {
		const data = await this.postService.findAll();
		res.status(status.HTTP_STATUS_OK).json(data);
	};

	public delete = async (req: Request, res: Response): Promise<void> => {
		try {
			await this.postService.delete(req.params.id);
			res.status(status.HTTP_STATUS_NO_CONTENT);
		} catch (err: any) {
			res.status(status.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
				errors: [
					{
						msg: err.message,
					},
				],
			});
		}
	};

	public update = async (req: Request, res: Response): Promise<void> => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res
					.status(status.HTTP_STATUS_BAD_REQUEST)
					.json({ errors: errors.array() });
			}
			const data = await this.postService.update(
				req.params.id,
				req.body,
				getToken(req)
			);
			res.status(status.HTTP_STATUS_CREATED).json(data);
		} catch (err: any) {
			res.status(status.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
				errors: [
					{
						msg: err.message,
					},
				],
			});
		}
	};
}
