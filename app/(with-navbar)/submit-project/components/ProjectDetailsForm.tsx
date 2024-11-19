import React, { useEffect, useState } from 'react';
import TextField from "@/components/textField/textField";
import styles from '../submit-project.module.scss';
import Button from "@/components/button/button";
import { ProviderDTO } from '../page';
import { getProjectSeeds } from '@/lib/api';

type ProjectDetailsData = {
    area: number;
    minAmount: number;
    amountNeed: number;
    providers: { name: string; seed: string }[];
};

type ProjectDetailsFormProps = ProjectDetailsData & {
    updateFields: (fields: Partial<ProjectDetailsData>) => void;
    errors: Partial<ProjectDetailsData>
};

export function ProjectDetailsForm({
    area,
    minAmount,
    amountNeed,
    providers,
    updateFields,
    errors
}: ProjectDetailsFormProps) {
    const [seeds, setSeeds] = useState<{ seed: string; providers: string[] }[]>([]);

    useEffect(() => {
        const fetchSeeds = async () => {
            const projectSeeds = await getProjectSeeds();
            setSeeds(projectSeeds);
        };
        fetchSeeds();

        if (providers.length === 0) {
            updateFields({ providers: [{ name: "", seed: "" }] });
        }
    }, [providers, updateFields]);

    const handleSeedTypeChange = (index: number, value: string) => {
        const newProviders = [...providers];
        newProviders[index].seed = value;
        newProviders[index].name = ""; // Reset provider name when seed changes
        updateFields({ providers: newProviders });
    };

    const handleProviderChange = (index: number, value: string) => {
        const newProviders = [...providers];
        newProviders[index].name = value;
        updateFields({ providers: newProviders });
    };

    const addProviderField = () => {
        updateFields({ providers: [...providers, { name: "", seed: "" }] });
    };

    const removeProviderField = (index: number) => {
        if (providers.length > 1) {
            const newProviders = providers.filter((_, i) => i !== index); 
            updateFields({ providers: newProviders });
        }
    };

    return (
        <div className={styles.innerForm}>
            <TextField
                placeholder="Ingrese el área en m2"
                name="area"
                label="Área (en m2)"
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

            <label className={styles.label}>Tipos de Cultivo y Proveedores</label>
            {providers.map((provider, index) => {
                // Find the seed options for the selected seed
                const seedOptions = seeds.find(seed => seed.seed === provider.seed)?.providers || [];

                return (
                    <div key={index} className={styles.seedTypeField}>
                        {/* Dropdown for Seed Type */}
                        <div>
                            <label>Tipo de Cultivo {index + 1}</label>
                            <select
                                value={provider.seed}
                                onChange={(e) => handleSeedTypeChange(index, e.target.value)}
                            >
                                <option value="">Seleccione un cultivo</option>
                                {seeds.map((seed) => (
                                    <option key={seed.seed} value={seed.seed}>
                                        {seed.seed}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Provider Dropdown */}
                        <div>
                            <label>Proveedor {index + 1}</label>
                            <select
                                value={provider.name}
                                onChange={(e) => handleProviderChange(index, e.target.value)}
                                disabled={!provider.seed} // Disable if no seed is selected
                            >
                                <option value="">Seleccione un proveedor</option>
                                {seedOptions.map((providerName, i) => (
                                    <option key={i} value={providerName}>
                                        {providerName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.seedTypeButtons}>
                            {providers.length > 1 && (
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        removeProviderField(index);
                                    }}
                                    className={styles.seedButton}
                                >
                                    -
                                </Button>
                            )}
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    addProviderField();
                                }}
                                className={styles.seedButton}
                            >
                                +
                            </Button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
