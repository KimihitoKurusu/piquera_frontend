import { AppDispatch } from '@/store/store'
import * as api from './api'
import * as reducers from './slice'
import {marcaData} from "@/feature/marca/types";

export const getAllMarcaData = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(reducers.setMarcaLoading(true))
        const data: marcaData[] = await api.getAllMarcaData()
        dispatch(reducers.setMarcaResponse(data))
        dispatch(reducers.setMarcaLoading(false))
    } catch (error) {
        dispatch(reducers.setMarcaLoading(false))
    }
}

export const insertMarcaDataAction = (item: marcaData) => async (dispatch: AppDispatch) => {
    try {
        dispatch(reducers.setMarcaLoading(true))
        dispatch(reducers.setMarcaSuccess(false))
        const data: marcaData[] = await api.insertMarcaData( item)
        dispatch(getAllMarcaData())
        dispatch(reducers.setMarcaLoading(false))
        dispatch(reducers.setMarcaSuccess(true))
    } catch (error) {
        dispatch(reducers.setMarcaLoading(false))
        dispatch(reducers.setMarcaError(error))
    }
}

export const updateMarcaDataAction = (id: number, item: marcaData) => async (dispatch: AppDispatch) => {
    try {
        dispatch(reducers.setMarcaLoading(true))
        dispatch(reducers.setMarcaSuccess(false))
        const data: marcaData[] = await api.updateMarcaData(id, item)
        dispatch(getAllMarcaData())
        dispatch(reducers.setMarcaLoading(false))
        dispatch(reducers.setMarcaSuccess(true))
    } catch (error) {
        dispatch(reducers.setMarcaLoading(false))
        dispatch(reducers.setMarcaError(error))
    }
}
