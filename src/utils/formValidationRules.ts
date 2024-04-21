/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidationRule } from "./formValidation";

// Email validation regex
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const createValidationRule = (field: string, validate: (value: any, formData: any) => boolean, errorMessage: string) => ({
  field,
  validate,
  errorMessage,
});

const commonLoginRegisterRules: ValidationRule[] = [
  createValidationRule('email', (value) => emailRegex.test(value), 'Email is required.'),
  createValidationRule('password', (value) => value !== '', 'Password is required.'),
];

export const verifyOtpRules: ValidationRule[] = [
  createValidationRule('email', (value) => emailRegex.test(value), 'Email is required.'),
  createValidationRule('otp', (value) => value.length < 6, 'Password is required min length 6'),
];

export const loginValidationRules: ValidationRule[] = commonLoginRegisterRules;

export const registerValidationRules: ValidationRule[] = [
  ...commonLoginRegisterRules,
  createValidationRule('phone', (value) => value !== '', 'Phone is required.'),
  createValidationRule('name', (value) => value !== '', 'Name is required.'),
];

export const productValidationRules: ValidationRule[] = [
  createValidationRule('name', (value) => value.length >= 3, 'Name must be at least 3 characters.'),
  createValidationRule('unit', (value) => value === 'kg' || value === 'piece', 'Unit must be "kg" or "piece"'),
  createValidationRule('pricePerKg', (value, formData) => formData.unit === 'kg' ? value !== '' : true, 'Price per Kg is required when the unit is "kg".'),
  createValidationRule('pricePerPiece', (value, formData) => formData.unit === 'piece' ? value !== '' : true, 'Price per Piece is required when the unit is "piece".'),
  createValidationRule('inStore', (value) => value !== '', 'In Store is required.'),
  createValidationRule('productImage', (value) => value.length > 0, 'Image is required.'),
  createValidationRule('category', (value) => value !== '', 'Category is required, please select a category'),
];

export const orderValidationRules: ValidationRule[] = [
  createValidationRule('name', (value) => value.length >= 3, 'Name must be at least 3 characters.'),
];

export const newAddressValidationRules: ValidationRule[] = [
  createValidationRule('name', (value) => value.length >= 3, 'Name must be at least 3 characters.'),
  createValidationRule('contactNo', (value) => value.length < 10, 'Contact must be at least 10 numbers'),
  createValidationRule('address', (value) => value.length !== '', 'Address is required'),
  createValidationRule('city', (value) => value.length !== '', 'City is required'),
  createValidationRule('state', (value) => value.length !== '', 'State is required'),
  createValidationRule('country', (value) => value.length !== '', 'Country is required'),
  createValidationRule('postalCode', (value) => value.length !== '', 'Postal Code is required'),
];