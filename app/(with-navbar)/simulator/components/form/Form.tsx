import Button from '@/components/button/button'
import Select from '@/components/select/Select'
import TextField from '@/components/textField/textField'
import { getYielRangedByCrop, simulate } from '@/lib/api'
import { Crop, SimulationData } from '@/types/api'
import { ZONES_PER_CROP } from '@/utils/cons'
import React, { useState, useEffect } from 'react'
import styles from './form.module.scss'

type FormProps = {
  onSubmit: (data: SimulationData) => void
}

const CropSimulationForm: React.FC<FormProps> = ({ onSubmit }) => {
  const [crop, setCrop] = useState<Crop>('trigo')
  const [zone, setZone] = useState('')
  const [yieldData, setYieldData] = useState<number>(0)
  const [investment, setInvestment] = useState<number>(500)
  const [hectaresAmount, setHectaresAmount] = useState<number>(1000)
  const [zonesOptions, setZonesOptions] = useState<
    { value: string; title: string }[]
  >([])
  const [yieldOptions, setYieldOptions] = useState<number[]>([])

  useEffect(() => {
    if (crop) {
      // Configurar las opciones de zonas dependiendo del cultivo seleccionado
      const zones = Object.keys(ZONES_PER_CROP[crop]).map((zone) => ({
        value: zone,
        title: ZONES_PER_CROP[crop][zone]
      }))
      setZonesOptions(zones)

      // Obtener el rango de rendimiento dependiendo del cultivo seleccionado
      getYielRangedByCrop(crop).then((data) => {
        const currentZone = data.find((z) => z.zone === zone)
        setYieldOptions(currentZone ? currentZone.yields : [])
      })
    }
  }, [crop, zone])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (crop && zone && yieldData && investment && hectaresAmount) {
      try {
        const result = await simulate(
          crop,
          zone,
          yieldData,
          investment,
          hectaresAmount
        )
        console.log('Simulación:', result)
        onSubmit(result)
      } catch (error) {
        console.error('Error simulando los datos:', error)
      }
    } else {
      alert('Por favor, completa todos los campos')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <Select
        label="Cultivo"
        placeholder="Selecciona el cultivo"
        name="crop"
        options={[
          { value: 'trigo', title: 'Trigo' },
          { value: 'soja_1ra', title: 'Soja de primera' },
          { value: 'soja_2da', title: 'Soja de segunda' },
          { value: 'maiz', title: 'Maíz' }
        ]}
        onChange={(e) => setCrop(e.target.value as Crop)}
        required
      />

      <Select
        label="Zona"
        placeholder="Selecciona la zona"
        name="zone"
        options={zonesOptions}
        onChange={(e) => setZone(e.target.value)}
        required
      />

      <Select
        label="Rendimiento (tn/ha)"
        placeholder="Selecciona el rendimiento"
        name="yieldData"
        options={yieldOptions.map((y) => ({
          value: y.toString(),
          title: `${y} tons`
        }))}
        onChange={(e) => setYieldData(Number(e.target.value))}
        required
      />

      <TextField
        label="Inversión (USD)"
        placeholder="Ingresa la inversión"
        name="investment"
        type="number"
        // @ts-ignore
        value={investment}
        onChange={(e) => setInvestment(Number(e.target.value))}
        required
      />

      <TextField
        label="Cantidad de Hectáreas (máx. 10.000)"
        placeholder="Ingresa la cantidad de hectáreas"
        name="hectaresAmount"
        type="number"
        min={1000}
        max={10000}
        // @ts-ignore
        value={hectaresAmount}
        onChange={(e) => setHectaresAmount(Number(e.target.value))}
        required
      />

      <Button fill>Simular inversión</Button>
    </form>
  )
}

export default CropSimulationForm
