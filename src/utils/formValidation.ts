/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ValidationRule {
    field: string;
    validate: (value: any, formData: Record<string, any>) => boolean;
    errorMessage: string;
}

export type ValidationRules = ValidationRule[];

export const validateForm = (
    formData: Record<string, any>,
    validationRules: ValidationRules,
    setErrors: (errors: Record<string, string>) => void
): boolean => {
    const validationErrors: Record<string, string> = {};

    validationRules.forEach((rule) => {
        const { field, validate, errorMessage } = rule;
        const value = formData[field];

        if (!validate(value, formData)) {
            validationErrors[field] = errorMessage;
        }
    });

    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some((error) => !!error);
    return hasErrors;
};