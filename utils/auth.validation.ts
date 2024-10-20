import { CompleteUserInfo } from "@/types/api";

type ValidationRule<T> = {
    field: keyof T;
    validate: (value: any, data?: T) => boolean;
    errorMessage: string;
};

const completeUserInfoValidationRules: ValidationRule<CompleteUserInfo>[] = [
    { field: 'name', validate: (value) => !!value, errorMessage: "El nombre no puede estar vacío" },
    { field: 'lastName', validate: (value) => !!value, errorMessage: "El apellido no puede estar vacío" },
    { field: 'cuit', validate: (value) => /^\d+$/.test(value), errorMessage: "El CUIT debe contener solo números." },
    { field: 'phone', validate: (value) => /^\+\d+$/.test(value), errorMessage: 'El número de teléfono debe comenzar con un "+" seguido de números.' },
    { field: 'country', validate: (value) => !!value, errorMessage: "El país no puede estar vacío" },
    { field: 'city', validate: (value) => !!value, errorMessage: "La ciudad no puede estar vacía" },
    { field: 'address', validate: (value) => !!value, errorMessage: "La dirección no puede estar vacía" },
    { field: 'state', validate: (value) => !!value, errorMessage: "El estado no puede estar vacío" },
];

export const validateCompleteUserInfo = (data: CompleteUserInfo): Partial<CompleteUserInfo> => {
    const errors: Partial<CompleteUserInfo> = {};

    completeUserInfoValidationRules.forEach(({ field, validate, errorMessage }) => {
        if (!validate(data[field])) {
            errors[field] = errorMessage;
        }
    });

    return errors;
};

export const isCompleteUserInfoValid = (errors: Partial<CompleteUserInfo>): boolean => {
    return Object.keys(errors).length === 0;
};

// Validation rules for login
export type LoginData = {
    email: string;
    password: string;
};

const loginValidationRules: ValidationRule<LoginData>[] = [
    { field: 'email', validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), errorMessage: "Dirección de correo electrónico no válida" },
    { field: 'password', validate: (value) => !!value, errorMessage: "La contraseña no puede estar vacía" },
];

export const validateLogin = (data: LoginData): Partial<LoginData> => {
    const errors: Partial<LoginData> = {};

    loginValidationRules.forEach(({ field, validate, errorMessage }) => {
        if (!validate(data[field])) {
            errors[field] = errorMessage;
        }
    });

    return errors;
};

export const isLoginValid = (errors: Partial<LoginData>): boolean => {
    return Object.keys(errors).length === 0;
};

// Validation rules for register
export type RegisterData = {
    email: string;
    country: string;
    phone: string;
    name: string;
    lastName: string;
    cuit: string;
    city: string;
    address: string;
    state: string;
    password: string;
    confirmPassword: string;
};


const registerValidationRules: ValidationRule<RegisterData>[] = [
    { field: 'email', validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), errorMessage: "Dirección de correo electrónico no válida" },
    { field: 'country', validate: (value) => !!value, errorMessage: "El país no puede estar vacío" },
    { field: 'phone', validate: (value) => /^\+\d+$/.test(value), errorMessage: 'El número de teléfono debe comenzar con un "+" seguido de números.' },
    { field: 'name', validate: (value) => !!value, errorMessage: "El nombre no puede estar vacío" },
    { field: 'lastName', validate: (value) => !!value, errorMessage: "El apellido no puede estar vacío" },
    { field: 'cuit', validate: (value) => /^\d+$/.test(value), errorMessage: "El CUIT debe contener solo números." },
    { field: 'city', validate: (value) => !!value, errorMessage: "La ciudad no puede estar vacía" },
    { field: 'address', validate: (value) => !!value, errorMessage: "La dirección no puede estar vacía" },
    { field: 'state', validate: (value) => !!value, errorMessage: "El estado no puede estar vacío" },
    { field: 'password', validate: (value) => !!value, errorMessage: "La contraseña no puede estar vacía" },
    { field: 'confirmPassword', validate: (value, data) => value === data?.password, errorMessage: "Las contraseñas no coinciden" },
];

export const validateRegister = (data: RegisterData): Partial<RegisterData> => {
    const errors: Partial<RegisterData> = {};

    registerValidationRules.forEach(({ field, validate, errorMessage }) => {
        if (!validate(data[field], data)) {
            errors[field] = errorMessage;
        }
    });

    return errors;
};

export const isRegisterValid = (errors: Partial<RegisterData>): boolean => {
    return Object.keys(errors).length === 0;
};