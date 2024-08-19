import Title from '../title/title'
import styles from './map.module.scss'
import dynamic from 'next/dynamic'

const MapView = dynamic(() => import('@/components/map/MapView'), {
  ssr: false
})

export default function Map() {
  return (
    <div className={styles.container}>
      <div className={styles.topSide}>
        <Title>Ubicación</Title>
        <div className={styles.location}>
          13000 Montevideo, Departamento de Montevideo
        </div>
      </div>
      <div className={styles.bottomSide}>
        <MapView />
      </div>
    </div>
  )
}
