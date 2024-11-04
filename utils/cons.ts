import { Crop } from "@/types/api";

export const ZONES_PER_CROP: Record<Crop, { [key: string]: string }> = {
    trigo: {
        "Norte de Bs As, Sur de Santa Fe": "Norte de Bs As, Sur de Santa Fe",
        "Sur de Entre rios": "Sur de Entre rios",
        "Sudeste de Buenos Aires": "Sudeste de Buenos Aires",
        "sudoeste de Buenos Aires": "Sudoeste de Buenos Aires",
        "Sudeste de Cordoba": "Sudeste de Cordoba",
        "Centro Oeste de Buenos Aires": "Centro Oeste de Buenos Aires",
        "Oeste de Bs. As, Este de la pampa": "Oeste de Bs. As, Este de la pampa"
    },
    soja_1ra: {
        "S. del estero": "S. del estero",
        "salta": "Salta",
        "sudoeste de bs as": "Sudoeste de Bs. As",
        "sudeste de bs as": "Sudeste de Bs. As",
        "norte bs as/ sur santa fe": "Norte de Bs As, Sur de Santa Fe",
        "sur entre rios": "Sur de Entre rios",
        "sur cordoba": "Sur de Cordoba",
        "oeste bs as": "Oeste de Bs. As"
    },
    soja_2da: {
        "sudeste de cordoba": "Sudeste de Cordoba",
        "sur de entre rios": "Sur de Entre rios",
        "norte de bs as- sur de santa fe": "Norte de Bs As, Sur de Santa Fe",
        "oeste bs as": "Oeste de Bs. As",
    },
    maiz: {
        "norte de buenos aires / sur de santa fe": "Norte de Bs As, Sur de Santa Fe",
        "sur de entre rios": "Sur de Entre rios",
        "sudeste de bs as": "Sudeste de Buenos Aires",
        "sudoeste de bs as": "Sudoeste de Buenos Aires",
        "oeste de bs as": "Oeste de Bs. As",
        "sur cordoba": "Sur de Cordoba",
    }
}