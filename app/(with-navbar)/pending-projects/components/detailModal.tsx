import React, {useState} from "react";
import styles from "./detailModal.module.scss";

import {ProjectData, ProjectDetailInfo} from "@/types/api";
import Button from "@/components/button/button";
import {format} from "date-fns";
import {es} from "date-fns/locale";

type EditProfileModalProps = {
    isOpen: boolean;
    onClose: () => void;
    data: ProjectDetailInfo;
    title: string;
}

export default function DetailModal({
                                        isOpen,
                                        onClose,
                                        data,
                                        title,
                                    }: EditProfileModalProps) {
    if (!isOpen) return null;

    const {
        name, amountNeed, amountCollected, minAmount, startDate, endDate, status,
        description, country, city, zipCode, state, area, latitude, longitude,
        producerName, producerLastName, producerEmail
    } = data;

    return (
        <div className={styles.container}>
            <div className={styles.modalContent}>
                <div className={styles.title}>
                    <h2>{title}</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className={styles.content}>
                    <p><strong>Nombre del Proyecto:</strong> {name}</p>
                    <p><strong>Descripción:</strong> {description}</p>
                    <p><strong>Monto Necesario:</strong> {amountNeed}</p>
                    <p><strong>Monto Recaudado:</strong> {amountCollected}</p>
                    <p><strong>Monto Mínimo:</strong> {minAmount}</p>
                    <p><strong>Fecha de Inicio:</strong> {format(new Date(startDate), "d 'de' MMMM 'de' yyyy", { locale: es })}</p>
                    <p><strong>Fecha de Finalización:</strong> {format(new Date(endDate), "d 'de' MMMM 'de' yyyy", { locale: es })}</p>
                    <p><strong>Estado:</strong> {status}</p>
                    <p><strong>Ubicación:</strong> {city}, {state}, {country}, {zipCode}</p>
                    <p><strong>Área:</strong> {area} m²</p>
                    <p><strong>Latitud:</strong> {latitude}</p>
                    <p><strong>Longitud:</strong> {longitude}</p>
                    <p><strong>Productor:</strong> {producerName} {producerLastName}</p>
                    <p><strong>Email del Productor:</strong> {producerEmail}</p>
                </div>
                <div className={styles.form}>
                    <Button className={styles.buttonContainer} variant="primary" onClick={() => console.log("Aprobado")}>
                        Aprobar
                    </Button>
                    <Button className={styles.buttonContainer} variant="secondary" onClick={() => console.log("Rechazado")}>
                        Rechazar
                    </Button>
                </div>
            </div>
        </div>
    );
}