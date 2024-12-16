import styles from './status.module.scss';
import { useState, useEffect } from "react";

type statusProps = {
    status: string;
};

export default function Status({ status }: statusProps) {
    const [text, setText] = useState<string>('');

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'PENDING':
                return styles.pending;
            case 'APPROVED':
                return styles.approved;
            case 'CANCELLED':
                return styles.cancelled;
            case 'WITHDRAWN':
                return styles.withdrawn;
            case 'RETURNS_INJECTED':
                return styles.returnsInjected;
            default:
                return styles.unknown;
        }
    };

    // Actualiza el texto cuando cambie el estado
    useEffect(() => {
        switch (status) {
            case 'PENDING':
                setText("PENDIENTE: el proyecto está esperando ser aprobado");
                break;
            case 'APPROVED':
                setText("APROBADO: el proyecto acepta inversiones");
                break;
            case 'CANCELLED':
                setText("CANCELADO: el proyecto ha sido cancelado");
                break;
            case 'WITHDRAWN':
                setText("EN COSECHA: ya no se aceptan más inversiones para este proyecto");
                break;
            case 'RETURNS_INJECTED':
                setText("RETORNOS INYECTADOS: los inversores pueden retirar sus ganancias");
                break;
            default:
                setText("DESCONOCIDO: estado no reconocido");
                break;
        }
    }, [status]);

    return (
        <div className={`${styles.container} ${getStatusClass(status)}`}>
            <p>{text}</p>
        </div>
    );
}
