import React, { useEffect } from 'react';
import TextField from "@/components/textField/textField";
import styles from '../submit-project.module.scss';
import Button from "@/components/button/button";

type ProjectDetailsData = {
    area: number;
    minAmount: number;
    amountNeed: number;
    seed: string[];
};

type ProjectDetailsFormProps = ProjectDetailsData & {
    updateFields: (fields: Partial<ProjectDetailsData>) => void;
};

export function ProjectDetailsForm({
                                       area,
                                       minAmount,
                                       amountNeed,
                                       seed,
                                       updateFields }
                                       : ProjectDetailsFormProps) {
    useEffect(() => {
        if (seed.length === 0) {
            updateFields({ seed: ["Soja"] });
        }
    }, [seed, updateFields]);

    const handleSeedTypeChange = (index: number, value: string) => {
        const newSeedTypes = [...seed];
        newSeedTypes[index] = value;
        updateFields({ seed: newSeedTypes });
    };

    const addSeedTypeField = () => {
        updateFields({ seed: [...seed, ""] });
    };

    const removeSeedTypeField = (index: number) => {
        if (seed.length > 1) {
            const newSeedTypes = seed.filter((_, i) => i !== index);
            updateFields({ seed: newSeedTypes });
        }
    };

    return (
        <div className={styles.innerForm}>
            <TextField
                placeholder="Ingrese el área en m2"
                name="area"
                label="Área"
                value={area.toString()}
                type="number"
                onChange={(e) => updateFields({ area: Number(e.target.value) })}
            />
            <TextField
                placeholder="Ingrese el monto mínimo"
                name="minAmount"
                label="Monto Mínimo"
                type="number"
                value={minAmount.toString()}
                onChange={(e) => updateFields({ minAmount: Number(e.target.value) })}
            />
            <TextField
                placeholder="Ingrese el monto final"
                name="finalAmount"
                label="Monto Final"
                type="number"
                value={amountNeed.toString()}
                onChange={(e) => updateFields({ amountNeed: Number(e.target.value) })}
            />

            <label className={styles.label}>Tipos de Cultivo</label>
            {seed.map((_, index) => (
                <div key={index} className={styles.seedTypeField}>
                    <TextField
                        placeholder="Ingrese el tipo de cultivo"
                        name={`seedType-${index}`}
                        label={`Tipo de Cultivo ${index + 1}`}
                        value={seed[index]}
                        onChange={(e) => handleSeedTypeChange(index, e.target.value)}
                    />
                    <div className={styles.seedTypeButtons}>
                        {seed.length > 1 && (
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