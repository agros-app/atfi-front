"use client"
import 'leaflet/dist/leaflet.css';
import {useEffect, useState} from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

type MapViewProps = {
    latitude: number;
    longitude: number;
};

const MapView = ({latitude,longitude}: MapViewProps) => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);



    return isClient ?(
        // @ts-ignore
        <MapContainer center={[latitude, longitude]} zoom={16} style={{height: '250px', width: '100%', position: 'sticky'}}
                      scrollWheelZoom={false}>
            <TileLayer
                // @ts-ignore
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]}>
                <Popup>
                    Ubicación del campo
                </Popup>
            </Marker>
        </MapContainer>
    ): null;
};

export default MapView;