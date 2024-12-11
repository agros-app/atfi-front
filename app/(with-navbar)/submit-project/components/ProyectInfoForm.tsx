import styles from '../submit-project.module.scss';
import React from "react";
import TextField from "@/components/textField/textField";
import DescriptionField from "@/components/descriptionField/descriptionField";

type ProjectInfoData = {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    startFarming: string;
    endFarming: string;
    returnsDate: string;
};

type ProjectInfoFormProps = ProjectInfoData & {
    updateFields: (fields: Partial<ProjectInfoData>) => void;
    errors: Partial<ProjectInfoData>;
};

export function ProjectInfoForm({
                                    name,
                                    description,
                                    startDate,
                                    endDate,
                                    startFarming,
                                    endFarming,
                                    updateFields,
                                    returnsDate,
                                    errors
                                }: ProjectInfoFormProps) {

    return (
        <div className={styles.innerForm}>
            <TextField
                placeholder="Ingrese el nombre del Proyecto"
                name="projectName"
                label="Nombre del Proyecto"
                value={name}
                onChange={(e) => updateFields({ name: e.target.value })}
                error={!!errors.name}
                helperText={errors.name}
            />
            <DescriptionField
                placeholder="Ingrese la descripción del Proyecto"
                name="description"
                label="Descripcion"
                value={description}
                onChange={(e) => updateFields({ description: e.target.value })}
                error={!!errors.description}
                helperText={errors.description}
            />
            <TextField
                placeholder="Ingrese fecha de inicio de financiamiento"
                name="initialDate"
                label="Fecha de Inicio de Financiamiento"
                type="date"
                value={startDate}
                onChange={(e) => updateFields({ startDate: e.target.value })}
                error={!!errors.startDate}
                helperText={errors.startDate}
            />
            <TextField
                placeholder="Ingrese fecha de finalización de financiamiento"
                name="endDate"
                label="Fecha de Finalizacion de Financiamiento"
                type="date"
                value={endDate}
                onChange={(e) => updateFields({ endDate: e.target.value })}
                error={!!errors.endDate}
                helperText={errors.endDate}
            />
            <TextField
                placeholder="Ingrese fecha de inicio de siembra"
                name="initialFarmingDate"
                label="Fecha de Inicio de cosecha"
                type="date"
                value={startFarming}
                onChange={(e) => updateFields({ startFarming: e.target.value })}
                error={!!errors.startFarming}
                helperText={errors.startFarming}
            />
            <TextField
                placeholder="Ingrese fecha estipulada de finalización de la cosecha"
                name="endFarmingDate"
                label="Fecha de Finalizacion de cosecha"
                type="date"
                value={endFarming}
                onChange={(e) => updateFields({ endFarming: e.target.value })}
                error={!!errors.endFarming}
                helperText={errors.endFarming}
            />
            <TextField
                placeholder="Ingrese fecha de retornos a inversores"
                name="ReturnsDate"
                label="Fecha de Retornos"
                type="date"
                value={returnsDate}
                onChange={(e) => updateFields({ returnsDate: e.target.value })}
                error={!!errors.returnsDate}
                helperText={errors.returnsDate}
            />

        </div>
    );
}