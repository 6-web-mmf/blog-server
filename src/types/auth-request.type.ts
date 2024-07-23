export interface IAuthRequest {
	email: string;
	password: string;
}

export interface IRegisterRequest extends IAuthRequest {
	name: string;
}
