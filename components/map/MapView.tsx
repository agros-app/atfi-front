'use client'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'

const MapComponent = () => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  //TODO: Add integration with real coordinates of a project with backend
  const lat = -33.454793
  const lng = -55.131597

  return isClient ? (
    // @ts-ignore
    <MapContainer
      center={[lat, lng]}
      zoom={16}
      style={{ height: '250px', width: '100%', position: 'sticky' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        // @ts-ignore
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>Ubicacion del campo</Popup>
      </Marker>
    </MapContainer>
  ) : null
}

export default MapComponent
