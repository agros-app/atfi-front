import styles from './submit-project.module.scss'
import TitleForm from "@/components/title_form/TitleForm";
import TextField from "@/components/textField/textField";
import DescriptionField from "@/components/descriptionField/descriptionField";
import Select from "@/components/select/Select";
import Button from "@/components/button/button";
export default function ProjectForm () {

    const options = [
        { value: "Argentina", title: "🇦🇷 Argentina" },
        { value: "Uruguay", title: "🇺🇾 Uruguay" },
        { value: "Chile", title: "🇨🇱 Chile" },
        { value: "Brasil", title: "🇧🇷 Brasil" },
    ];

    const fieldOption = [
        { value: "Soja", title: "Soja" },
        { value: "Maiz", title: "Maiz" },
        { value: "Trigo", title: "Trigo" },
    ];
    //TODO: Add integration with backend
    return (
        <div className={styles.pageContainer}>
            <form>

            <div className={styles.formContainer}>
                <div className={styles.forms}>
                    <div className={styles.innerForm}>
                        <TitleForm text={"Informacion Principal"}/>
                        <TextField
                            placeholder="Ingrese el nombre del Proyecto"
                            name="projectName"
                            label="Nombre del Proyecto"
                        />

                        <DescriptionField
                            placeholder="Ingrese la descripcion del Proyecto"
                            name="description"
                            label="Descripcion"
                        />
                        <TextField
                            placeholder="Ingrese fecha de inicio"
                            name="initialDate"
                            label="Fecha de Inicio"
                            type={"date"}
                        />
                        <TextField
                            placeholder="Ingrese fecha de finalizacion"
                            name="endDate"
                            label="Fecha de Finalizacion"
                            type={"date"}
                        />
                    </div>

                    <div className={styles.innerForm}>
                        <TitleForm text={"Ubicación del Proyecto"}/>
                        <Select
                            placeholder="Ingrese el pais del Proyecto"
                            name="country"
                            options={options}
                            label="País"
                        />
                        <TextField
                            placeholder="Ingrese la provincia del Proyecto"
                            name="state"
                            label="Provincia"
                        />
                        <TextField
                            placeholder="Ingrese la ciudad del Proyecto"
                            name="city"
                            label="Ciudad"
                        />
                        <TextField
                            placeholder="Ingrese el codigo postal del Proyecto"
                            name="zipCode"
                            label="Codigo Postal"
                        />
                        <TextField
                            placeholder="Ingrese la calle del Proyecto"
                            name="street"
                            label="Calle"
                        />
                        <TextField
                            placeholder="Ingrese el numero de calle del Proyecto"
                            name="streetNumber"
                            label="Numero de calle"
                        />
                        <TextField
                            placeholder="Ingrese la latitud del Proyecto"
                            name="latitude"
                            label="Latitud"
                        />
                        <TextField
                            placeholder="Ingrese la longitud del Proyecto"
                            name="longitude"
                            label="Longitud"
                        />
                    </div>
                    <div className={styles.innerForm}>
                        <TitleForm text={"Detalles del Proyecto"}/>
                        <TextField
                            placeholder="Ingrese el area del Proyecto"
                            name="area"
                            label="Area"
                            type={"number"}
                        />
                        <TextField
                            placeholder="Ingrese el monto minimo del Proyecto"
                            name="minAmount"
                            label="Monto Minimo"
                            type={"number"}
                        />
                        <TextField
                            placeholder="Ingrese el monto final del Proyecto"
                            name="finalAmount"
                            label="Monto Final"
                            type={"number"}
                        />
                        <TextField
                            placeholder="Ingrese tipo de cultivo del Proyecto"
                            name="finalAmount"
                            label="Monto Final"
                            type={"number"}
                        />
                        <Select
                            placeholder="Ingrese tipo de cultivo del Proyecto"
                            name="seedType"
                            label="Tipo de Cultivo"
                            options={fieldOption}
                        />
                        <Button
                            className={styles.buttonContainer}
                        >
                            Continuar
                        </Button>
                    </div>
                </div>
            </div>
            </form>
        </div>
    )
}
