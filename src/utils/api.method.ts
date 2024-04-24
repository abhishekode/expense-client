/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { CurrentUser } from 'Interfaces/common';
import {
    LoginRequest,
    NewUserRequest,
    ChangeForgotPasswordRequest,
    VerifyEmailOtpRequest,
    CreateExpenseRequest,
    UpdateExpenseRequest,
    ChangePasswordRequest,
    UpdateUserRequest,
    QueryExpenseRequest,
} from 'Interfaces/auth.api';

const API_BASE_URL = 'http://localhost:5000/api/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
});

const getAccessToken = (): string => {
    const user: CurrentUser | null = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user?.token || ''
    return token;
};

const withAuthorization = {
    headers: {
        'Authorization': `Bearer ${getAccessToken()}`,
    },
};

const withAuthorizationFormData = {
    headers: {
        'Authorization': `Bearer ${getAccessToken()}`,
        'Content-Type': 'multipart/form-data',
    },
};

const handleRequest = async (request: Promise<any>) => {
    try {
        const response = await request;
        return response.data;
    } catch (error: any) {
        throw error.response ? error.response.data : error.message;
    }
};

export const AuthAPI = {
    registerUser: (userData: NewUserRequest) => handleRequest(api.post('/users/register', userData)),
    loginUser: (loginData: LoginRequest) => handleRequest(api.post('/users/login', loginData)),
    forgotPassword: (email: string) => handleRequest(api.post('/users/forgot-password', { email })),
    resendForgotPasswordOTP: (email: string) => handleRequest(api.post('/users/resend-forgot-password-otp', { email })),
    resendVerifyOTP: (email: string) => handleRequest(api.post('/users/resend-otp', { email })),
    verifyOTP: (otpData: VerifyEmailOtpRequest) => handleRequest(api.post('/users/verify-otp', otpData)),
    changeForgotPassword: (passwordData: ChangeForgotPasswordRequest) => handleRequest(api.put('/users/change-forgot-password', passwordData)),
    changePassword: (passwordData: ChangePasswordRequest) => handleRequest(api.put('/users/change-password', passwordData, withAuthorization)),
    updateAccount: (userData: UpdateUserRequest) => handleRequest(api.put('/users/account', userData, withAuthorizationFormData)),
    deactivateAccount: () => handleRequest(api.post('/users/deactivate-account', {}, withAuthorization)),
    getUserProfile: () => handleRequest(api.get('/users/profile', withAuthorization)),
};

export const CategoryAPI = {
    createCategory: (categoryData: FormData) => handleRequest(api.post('/category', categoryData, withAuthorizationFormData)),
    getAllCategories: () => handleRequest(api.get('/category')),
    getCategoryById: (id: string) => handleRequest(api.get(`/category/${id}`)),
    updateCategory: (id: string, categoryData: FormData) => handleRequest(api.put(`/category/${id}`, categoryData, withAuthorizationFormData)),
    deleteCategory: (id: string) => handleRequest(api.delete(`/category/${id}`, withAuthorization)),
};

export const ExpenseAPI = {
    createExpense: (expenseData: CreateExpenseRequest) => handleRequest(api.post('/expense', expenseData, withAuthorization)),
    getAllExpenses: (query: QueryExpenseRequest) => handleRequest(api.get('/expense', { params: query, ...withAuthorization })),
    getExpenseById: (id: string) => handleRequest(api.get(`/expense/${id}`, withAuthorization)),
    updateExpense: (id: string, expenseData: UpdateExpenseRequest) => handleRequest(api.patch(`/expense/${id}`, expenseData, withAuthorizationFormData)),
    deleteExpense: (id: string) => handleRequest(api.delete(`/expense/${id}`, withAuthorization)),
};

export default api;
