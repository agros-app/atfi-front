import Title from '../title/title';
import styles from './map.module.scss';
import dynamic from "next/dynamic"

type MapProps = {
    country: string;
    state: string;
    city: string;
    latitude: string,
    longitude: string,
}

const MapView = dynamic(() => import("@/components/map/MapView"), { ssr:false })


export default function Map(data:MapProps ){
    return (
        <div className={styles.container}>
            <div className={styles.topSide}>
                <Title>Ubicación</Title>
                <div className={styles.location}>{`${data.country}, ${data.state}, ${data.city}`}</div>
            </div>
            <div className={styles.bottomSide}>
                <MapView latitude={parseFloat(data.latitude)} longitude={parseFloat(data.longitude)}/>
            </div>
        </div>
    );
}