import React from 'react';
import TextField from "@/components/textField/textField";
import DescriptionField from "@/components/descriptionField/descriptionField";
import styles from '../submit-project.module.scss';

type ProjectInfoData = {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
};

type ProjectInfoFormProps = ProjectInfoData & {
    updateFields: (fields: Partial<ProjectInfoData>) => void;
};

export function ProjectInfoForm({
                                    name,
                                    description,
                                    startDate,
                                    endDate,
                                    updateFields}
                                    : ProjectInfoFormProps) {

    return (
        <div className={styles.innerForm}>
            <TextField
                placeholder="Ingrese el nombre del Proyecto"
                name="projectName"
                label="Nombre del Proyecto"
                value={name}
                onChange={(e) => updateFields({ name: e.target.value })}
            />
            <DescriptionField
                placeholder="Ingrese la descripcion del Proyecto"
                name="description"
                label="Descripcion"
                value={description}
                onChange={(e) => updateFields({ description: e.target.value })}
            />
            <TextField
                placeholder="Ingrese fecha de inicio"
                name="initialDate"
                label="Fecha de Inicio"
                type="date"
                value={startDate}
                onChange={(e) => updateFields({ startDate: e.target.value })}
            />
            <TextField
                placeholder="Ingrese fecha de finalizacion"
                name="endDate"
                label="Fecha de Finalizacion"
                type="date"
                value={endDate}
                onChange={(e) => updateFields({ endDate: e.target.value })}
            />
        </div>
    );
}