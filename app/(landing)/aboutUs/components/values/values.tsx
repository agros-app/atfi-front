import styles from "./values.module.scss";
import React from "react";
import Value from "@/app/(landing)/aboutUs/components/value/value";

export default function Values() {
    return(
        <section className={styles.container}>
            <div className={styles.valueWrapper}>
                <h2 className={styles.heading}>Guiados por valores que nos identifican</h2>
                <div className={styles.values}>
                    <Value heading={"Trazable y transparente"} text={"Blockchain como medio de pago. Esta herramienta que nos permite trazar y mostrar el camino del dinero y los datos de manera segura y trasparente."} />
                    <Value heading={"Inclusivo y accesible"} text={"La inversión en activos agropecuarios es una manera de diversificar tu cartera, disminuyendo el riesgo total de la misma."} />
                    <Value heading={"Sostenible y responsable"} text={"Agras tiene un compromiso inquebrantable para con su ecosistema de respetar los marcos legales y regulatorios del país."} />
                </div>
            </div>
        </section>
    )
}
