import { useState } from "react";
import styles from "./filters.module.scss";

interface FiltersProps {
    onFilterChange: (filter: { country: string | null; type: string | null }) => void;
    countries: string[];
    types: string[];
    projects: any[];
}

export default function Filters({ onFilterChange, countries, types, projects }: FiltersProps) {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const handleCountryClick = (country: string | null) => {
        setSelectedCountry(country);
        onFilterChange({ country, type: selectedType });
    };

    const handleTypeClick = (type: string | null) => {
        setSelectedType(type);
        onFilterChange({ country: selectedCountry, type });
    };
    console.log(countries, types, projects)
    return (
        <div>
            <h2>Proyectos</h2>
            <div className={styles.categories}>
                <div className={styles.category}>
                    <h4>Ubicación</h4>
                    {countries.map((country) => {
                        const countryCount = projects.filter((project) => project.country === country).length;
                        return (
                            <p key={country} onClick={() => handleCountryClick(country)}>
                                {country} <b>({countryCount})</b>
                            </p>
                        );
                    })}
                    <p onClick={() => handleCountryClick(null)}>Todos</p>
                </div>
                <div className={styles.category}>
                    <h4>Tipo de cosecha</h4>
                    {types.map((type) => {
                        const typesCount = projects.filter((project) => project.seeds.includes(type.toLowerCase())).length;
                        return (
                            <p key={type} onClick={() => handleTypeClick(type)}>
                            {type} <b>({typesCount})</b>
                            </p>
                        );
                    })}
                    <p onClick={() => handleTypeClick(null)}>Todos</p>
                </div>
            </div>
        </div>
    );
}
