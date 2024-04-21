import {
    LoginRequest,
    NewUserRequest,
    ChangeForgotPasswordRequest,
    VerifyEmailOtpRequest,
    CreateExpenseRequest,
    UpdateExpenseRequest,
    ChangePasswordRequest,
    CreateCategoryRequest,
    UpdateCategoryRequest,
    UpdateUserRequest,
    QueryExpenseRequest,
} from 'Interfaces/auth.api';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1';

// Create Axios instance with default configurations
const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add a request interceptor to include bearer token in the headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken'); // Assuming the token is stored in localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Users
export const registerUser = (userData: NewUserRequest) => api.post('/users/register', userData);
export const loginUser = (loginData: LoginRequest) => api.post('/users/login', loginData);
export const forgotPassword = (email: string) => api.post('/users/forgot-password', { email });
export const resendForgotPasswordOTP = (email: string) => api.post('/users/resend-forgot-password-otp', { email });
export const resendVerifyOTP = (email: string) => api.post('/users/resend-otp', { email });
export const verifyOTP = (otpData: VerifyEmailOtpRequest) => api.post('/users/verify-otp', otpData);
export const changeForgotPassword = (passwordData: ChangeForgotPasswordRequest) => api.put('/users/change-forgot-password', passwordData);
export const changePassword = (passwordData: ChangePasswordRequest) => api.put('/users/change-password', passwordData);
export const updateAccount = (userData: UpdateUserRequest) => api.put('/users/account', userData);
export const deactivateAccount = () => api.post('/users/deactivate-account');
export const getUserProfile = () => api.get('/users/profile');

// Category
export const createCategory = (categoryData: CreateCategoryRequest) => api.post('/category', categoryData);
export const getAllCategories = () => api.get('/category');
export const getCategoryById = (id: string) => api.get(`/category/${id}`);
export const updateCategory = (id: string, categoryData: UpdateCategoryRequest) => api.put(`/category/${id}`, categoryData);
export const deleteCategory = (id: string) => api.delete(`/category/${id}`);

// Expense
export const createExpense = (expenseData: CreateExpenseRequest) => api.post('/expense', expenseData);
export const getAllExpenses = (query: QueryExpenseRequest) => {
    return api.get('/expense', { params: query });
};
export const getExpenseById = (id: string) => api.get(`/expense/${id}`);
export const updateExpense = (id: string, expenseData: UpdateExpenseRequest) => api.patch(`/expense/${id}`, expenseData);
export const deleteExpense = (id: string) => api.delete(`/expense/${id}`);

export default api;
