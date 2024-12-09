import React from 'react';
import TextField from "@/components/textField/textField";
import styles from '../submit-project.module.scss';

type ProjectDetailsData = {
    area: number;
    minAmount: number;
    amountNeed: number;
};

type ProjectDetailsFormProps = ProjectDetailsData & {
    updateFields: (fields: Partial<ProjectDetailsData>) => void;
    errors: Partial<ProjectDetailsData>
};

export function ProjectDetailsForm({
    area,
    minAmount,
    amountNeed,
    updateFields,
    errors
}: ProjectDetailsFormProps) {

    return (
        <div className={styles.innerForm}>
            <TextField
                placeholder="Ingrese el área en m2"
                name="area"
                label="Área (en ha)"
                value={area.toString()}
                type="number"
                onChange={(e) => updateFields({ area: Number(e.target.value) })}
                error={!!errors.area}
                helperText={errors.area?.toString()}
            />
            <TextField
                placeholder="Ingrese el monto mínimo"
                name="minAmount"
                label="Monto Mínimo Requerido"
                type="number"
                value={minAmount.toString()}
                onChange={(e) => updateFields({ minAmount: Number(e.target.value) })}
                error={!!errors.minAmount}
                helperText={errors.minAmount?.toString()}
            />
            <TextField
                placeholder="Ingrese el monto final"
                name="finalAmount"
                label="Monto Final"
                type="number"
                value={amountNeed.toString()}
                onChange={(e) => updateFields({ amountNeed: Number(e.target.value) })}
                error={!!errors.amountNeed}
                helperText={errors.amountNeed?.toString()}
            />
        </div>
    );
}
