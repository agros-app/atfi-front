import styles from './map.module.scss';
import { getLocationById } from "@/api";
import {useEffect, useState} from "react";
import {Address} from "@/types"


type MapProps = {
    addressId: number;
}

export default function Map({ addressId }: MapProps) {
    const [address, setAddress] = useState<Address | null>(null);

    useEffect(() => {
        async function fetchAddress() {
            const result = await getLocationById(addressId);
            setAddress(result);
        }
        fetchAddress();
    }, [addressId]);

    return (
        <div>
            <div className={styles.location}>{address ? address.streetNumber + " " + address.street + ", " + address.city + ", " + address.state : 'Cargando...'}</div>
            <div className={styles.bottomSide}>
                <img src="/sampleMap.png" alt="Estadio UNO location" />
            </div>
        </div>
    );
}