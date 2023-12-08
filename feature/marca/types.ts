
interface marcaData {
    id:         number
    nombre:     string
    tiempo_km:  number
    precio_km:  number
}
interface marcaDataState {
    isLoading: boolean
    data: marcaData[] | null | []
    success: boolean
    error: string
}


export type { marcaData, marcaDataState }
