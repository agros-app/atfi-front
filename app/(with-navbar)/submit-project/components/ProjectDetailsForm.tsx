import React, { useEffect } from 'react';
import TextField from "@/components/textField/textField";
import styles from '../submit-project.module.scss';
import Button from "@/components/button/button";

type ProjectDetailsData = {
    area: number;
    minAmount: number;
    finalAmount: number;
    seedType: string[];
};

type ProjectDetailsFormProps = ProjectDetailsData & {
    updateFields: (fields: Partial<ProjectDetailsData>) => void;
};

export function ProjectDetailsForm({ seedType, updateFields }: ProjectDetailsFormProps) {
    // Asegúrate de que seedType tenga un valor por defecto
    useEffect(() => {
        if (seedType.length === 0) {
            updateFields({ seedType: ["Soja"] });
        }
    }, [seedType, updateFields]);

    const handleSeedTypeChange = (index: number, value: string) => {
        const newSeedTypes = [...seedType];
        newSeedTypes[index] = value;
        updateFields({ seedType: newSeedTypes });
    };

    const addSeedTypeField = () => {
        updateFields({ seedType: [...seedType, ""] });
    };

    const removeSeedTypeField = (index: number) => {
        if (seedType.length > 1) {
            const newSeedTypes = seedType.filter((_, i) => i !== index);
            updateFields({ seedType: newSeedTypes });
        }
    };

    return (
        <div className={styles.innerForm}>
            <TextField
                placeholder="Ingrese el área"
                name="area"
                label="Área"
                type="number"
                onChange={(e) => updateFields({ area: Number(e.target.value) })}
            />
            <TextField
                placeholder="Ingrese el monto mínimo"
                name="minAmount"
                label="Monto Mínimo"
                type="number"
                onChange={(e) => updateFields({ minAmount: Number(e.target.value) })}
            />
            <TextField
                placeholder="Ingrese el monto final"
                name="finalAmount"
                label="Monto Final"
                type="number"
                onChange={(e) => updateFields({ finalAmount: Number(e.target.value) })}
            />

            <label className={styles.label}>Tipos de Cultivo</label>
            {seedType.map((_, index) => (
                <div key={index} className={styles.seedTypeField}>
                    <TextField
                        placeholder="Ingrese el tipo de cultivo"
                        name={`seedType-${index}`}
                        label={`Tipo de Cultivo ${index + 1}`}
                        onChange={(e) => handleSeedTypeChange(index, e.target.value)}
                    />
                    <div className={styles.seedTypeButtons}>
                        {seedType.length > 1 && (
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    removeSeedTypeField(index);
                                }}
                                className={styles.seedButton}
                            >
                                -
                            </Button>
                        )}
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                addSeedTypeField();
                            }}
                            className={styles.seedButton}
                        >
                            +
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}