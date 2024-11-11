import React from 'react';
import TextField from "@/components/textField/textField";
import Select from "@/components/select/Select";
import styles from '../submit-project.module.scss';
import ImageUploadField from "@/components/imageUploadField/ImageUplaodField";

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
    errors: Partial<ProjectLocationData>;
};

export function ProjectLocationForm({   state,
                                        city,
                                        zipCode,
                                        latitude,
                                        longitude,
                                        updateFields ,
                                        errors}
                                        : ProjectLocationFormProps) {
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
                error={!!errors.country}
                helperText={errors.country}
            />
            <TextField
                placeholder="Ingrese la provincia"
                name="state"
                label="Provincia"
                value={state}
                onChange={(e) => updateFields({ state: e.target.value })}
                error={!!errors.state}
                helperText={errors.state}
            />
            <TextField
                placeholder="Ingrese la ciudad"
                name="city"
                label="Ciudad"
                value={city}
                onChange={(e) => updateFields({ city: e.target.value })}
                error={!!errors.city}
                helperText={errors.city}
            />
            <TextField
                placeholder="Ingrese el código postal"
                name="zipCode"
                label="Código Postal"
                value={zipCode}
                onChange={(e) => updateFields({ zipCode: e.target.value })}
                error={!!errors.zipCode}
                helperText={errors.zipCode}
            />
            <TextField
                placeholder="Ingrese la latitud"
                name="latitude"
                label="Latitud"
                value={latitude}
                onChange={(e) => updateFields({ latitude: e.target.value })}
                error={!!errors.latitude}
                helperText={errors.latitude}
            />
            <TextField
                placeholder="Ingrese la longitud"
                name="longitude"
                label="Longitud"
                value={longitude}
                onChange={(e) => updateFields({ longitude: e.target.value })}
                error={!!errors.longitude}
                helperText={errors.longitude}
            />
        </div>
    );
}