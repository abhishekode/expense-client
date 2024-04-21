export enum UserRole {
	User = 'user',
	Admin = 'admin',
}

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export interface MongoResponse {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface CurrentUser extends MongoResponse{
    name: string;
	email: string;
	phone: number;
	password: string;
	role: UserRole;
	isEmailVerified: boolean;
	isAccountDeactivated: boolean;
	otp?: number;
	otpExpireTime?: Date;
	resetPasswordToken?: string;
	description?: string;
	gender?: Gender;
	profileImg?: string;
	token?: string;
}

export interface ICategory extends MongoResponse{
    name: string;
	categoryImage: string;
}

export interface IExpenses extends MongoResponse{
    amount: number;
	description: string;
	category: {
        _id: string;
        name: string;
    };
	user: string;
}