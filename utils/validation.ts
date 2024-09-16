import { ProjectFormData } from "@/app/(with-navbar)/submit-project/page";

type ValidationRule = {
    field: keyof ProjectFormData;
    validate: (value: any) => boolean;
    errorMessage: string;
};

/*
 * Validation rules for each step in the project form, only validates the fields that are required in each step
 */
const validationRules: Record<number, ValidationRule[]> = {
    0: [
        { field: 'name', validate: (value) => !!value, errorMessage: "El nombre del proyecto no puede estar vacío" },
        { field: 'description', validate: (value) => !!value, errorMessage: "La descripción no puede estar vacía" },
        { field: 'startDate', validate: (value) => !!value, errorMessage: "La fecha de inicio no puede estar vacía" },
        { field: 'endDate', validate: (value) => !!value, errorMessage: "La fecha de finalización no puede estar vacía" },
    ],
    1: [
        { field: 'country', validate: (value) => !!value, errorMessage: "El país no puede estar vacío" },
        { field: 'state', validate: (value) => !!value, errorMessage: "El estado no puede estar vacío" },
        { field: 'city', validate: (value) => !!value, errorMessage: "La ciudad no puede estar vacía" },
        { field: 'zipCode', validate: (value) => !!value, errorMessage: "El código postal no puede estar vacío" },
        {
            field: 'latitude',
            validate: (value) => /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/.test(value),
            errorMessage: "La latitud no es válida"
        },
        {
            field: 'longitude',
            validate: (value) => /^[-+]?((1[0-7]\d)|([1-9]?\d)|180)(\.\d+)?$/.test(value),
            errorMessage: "La longitud no es válida"
        },
    ],
    2: [
        { field: 'area', validate: (value) => value > 0, errorMessage: "El área debe ser mayor que 0" },
        { field: 'minAmount', validate: (value) => value > 0, errorMessage: "El monto mínimo debe ser mayor que 0" },
        { field: 'amountNeed', validate: (value) => value > 0, errorMessage: "El monto necesario debe ser mayor que 0" },
        {
            field: 'seed',
            validate: (value) => value.every((seed: string) => seed.trim() !== ""),
            errorMessage: "Cada tipo de semilla debe tener un valor"
        },
        {
            field: 'providers',
            validate: (value) => value.length > 0 && value.every((provider: string) => provider.trim() !== ""),
            errorMessage: "Debe asociar un proveedor a cada semilla"
        },
    ],
};

export const validateStep = (step: number, data: ProjectFormData): Partial<ProjectFormData> => {
    const stepRules = validationRules[step] || [];
    const errors: Partial<ProjectFormData> = {};

    stepRules.forEach(({ field, validate, errorMessage }) => {
        if (!validate(data[field])) {
            // @ts-ignore
            errors[field] = errorMessage;
        }
    });

    return errors;
};

export const isStepValid = (errors: Partial<ProjectFormData>): boolean => {
    return Object.keys(errors).length === 0;
};