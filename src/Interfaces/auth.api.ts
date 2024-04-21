// ----------------------------------------------------------------

import { Gender, IExpenses } from "./common";

// User & Auth Interfaces
export interface LoginRequest {
    email: string;
    password: string;
}

export interface NewUserRequest extends LoginRequest {
    name: string;
    phone: string;
}

export interface VerifyEmailOtpRequest {
    email: string;
    otp: number;
}
export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export interface ChangeForgotPasswordRequest {
    email: string;
    newPassword: string;
}
export interface UpdateUserRequest {
    name?: string;
    description?: string;
    gender?: Gender;
    profileImg?: File;
}

// ------------------------------------------------

// Category Interface
export interface CreateCategoryRequest {
    name: string;
    categoryImage: File;
}

export interface UpdateCategoryRequest {
    name?: string;
    categoryImage?: File;
}

// ------------------------------------------------

// Expense Interface
export interface CreateExpenseRequest {
    amount: number;
    description: string;
    category: string;
}

export interface UpdateExpenseRequest {
    amount?: number;
    description?: string;
    category?: string;
}

export interface QueryExpenseRequest{
    category?: string;
    startDate?: Date;
    endDate?: Date;
    minAmount?: number;
    size: number;
    maxAmount?: number;
    page: number;
}

// Interface for response format of getAllExpenses
export interface GetAllExpensesResponse {
      expenses: IExpenses[];
      count: number;
  }