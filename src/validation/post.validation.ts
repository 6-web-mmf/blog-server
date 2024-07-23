import { ValidationChain, body } from "express-validator";

export class PostValidation {
	public updateValidation: ValidationChain[] = [
		body("title", "Title should contain more then 1 characters").isLength({
			min: 1,
		}),
		body("content", "Content should contain 5 characters").isLength({
			min: 5,
		}),
		body("img", "Image should be URL").isURL(),
	];
	public createValidation: ValidationChain[] = [
		...this.updateValidation,
	];
}
