import React from 'react';
import TextField from "@/components/textField/textField";
import Select from "@/components/select/Select";
import styles from '../submit-project.module.scss';

type ProjectLocationData = {
    country: string;
    state: string;
    city: string;
    zipCode: string;
    latitude: string;
    longitude: string;
};

type ProjectLocationFormProps = ProjectLocationData & {
    updateFields: (fields: Partial<ProjectLocationData>) => void;
};

export function ProjectLocationForm({updateFields}: ProjectLocationFormProps) {
    const options = [
        { value: "Argentina", title: "🇦🇷 Argentina" },
        { value: "Uruguay", title: "🇺🇾 Uruguay" },
        { value: "Chile", title: "🇨🇱 Chile" },
        { value: "Brasil", title: "🇧🇷 Brasil" },
    ];

    return (
        <div className={styles.innerForm}>
            <Select
                placeholder="Seleccione el país"
                name="country"
                options={options}
                label="País"
                onChange={(e) => updateFields({ country: e.target.value })}
            />
            <TextField
                placeholder="Ingrese la provincia"
                name="state"
                label="Provincia"
                onChange={(e) => updateFields({ state: e.target.value })}
            />
            <TextField
                placeholder="Ingrese la ciudad"
                name="city"
                label="Ciudad"
                onChange={(e) => updateFields({ city: e.target.value })}
            />
            <TextField
                placeholder="Ingrese el código postal"
                name="zipCode"
                label="Código Postal"

                onChange={(e) => updateFields({ zipCode: e.target.value })}
            />
            <TextField
                placeholder="Ingrese la latitud"
                name="latitude"
                label="Latitud"
                onChange={(e) => updateFields({ latitude: e.target.value })}
            />
            <TextField
                placeholder="Ingrese la longitud"
                name="longitude"
                label="Longitud"
                onChange={(e) => updateFields({ longitude: e.target.value })}
            />
        </div>
    );
}