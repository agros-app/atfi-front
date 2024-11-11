import { ProjectFormData, ProviderDTO } from "@/app/(with-navbar)/submit-project/page";

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
        { field: 'startDate', validate: (value) => !!value, errorMessage: "La fecha de inicio de financiamiento no puede estar vacía" },
        { field: 'startDate', validate: (value) => {
            const date = new Date(value);
            const today = new Date();
            return date > today;
        }, errorMessage: "La fecha de inicio de financiamiento debe ser en el futuro" },
        { field: 'startFarming', validate: (value) => !!value, errorMessage: "La fecha de inicio de cosecha no puede estar vacía" },
        { field: 'startFarming', validate: (value) => {
            const date = new Date(value);
            const today = new Date();
            return date > today;
        }, errorMessage: "La fecha de inicio de cosecha debe ser en el futuro" },
        { field: 'endDate', validate: (value) => !!value, errorMessage: "La fecha de finalización de financiamiento no puede estar vacía" },
        { field: 'endDate', validate: (value) => {
            const date = new Date(value);
            const today = new Date();
            return date > today;
        }, errorMessage: "La fecha de finalización de financiamiento debe ser en el futuro" },
        { field: 'endFarming', validate: (value) => !!value, errorMessage: "La fecha de finalización de cosecha no puede estar vacía" },
        { field: 'endFarming', validate: (value) => {
            const date = new Date(value);
            const today = new Date();
            return date > today;
        }, errorMessage: "La fecha de finalización de cosecha debe ser en el futuro" },
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
            field: 'amountNeed',
            validate: (value) => {
              const parsedValue = parseInt(value, 10);
              return !isNaN(parsedValue) && parsedValue > 0;
            },
            errorMessage: "El monto necesario debe ser mayor que 0 y debe ser un número válido"
          },
        {
            field: 'providers',
            validate: (value) => value.length > 0 && value.every((provider: ProviderDTO) => 
                provider.seed.trim() !== ""
            ),
            errorMessage: "Cada tipo de semilla debe tener un valor"
        },
        {
            field: 'providers',
            validate: (value) => value.length > 0 && value.every((provider: ProviderDTO) => 
                provider.name.trim() !== ""
            ),
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