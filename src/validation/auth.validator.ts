import { ValidationChain, body } from "express-validator";

export class AuthValidation {
	public signInValidation: ValidationChain[] = [
		body("email", "Invalid email format").isEmail(),
		body("password", "Password should contain 5 characters").isLength({
			min: 5,
		}),
	];

	public signUpValidation: ValidationChain[] = [
		...this.signInValidation,
		body("name", "Name should contain 1 characters").isLength({
			min: 1,
		}),
	];
}
