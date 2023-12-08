import axiosApi from "@/config/axios";
import {marcaData} from "@/feature/marca/types";

export async function getAllMarcaData(): Promise<marcaData[]> {
    const {data} = await axiosApi.get('piquera/marca/')
    return data
}

export async function insertMarcaData(item: marcaData): Promise<marcaData[]> {
    const {data} = await axiosApi.post('piquera/marca/', item)
    return data
}

export async function updateMarcaData(id: number, item: marcaData): Promise<marcaData[]> {
    const {data} = await axiosApi.put(`piquera/marca/${id}/`, item);
    return data
}
