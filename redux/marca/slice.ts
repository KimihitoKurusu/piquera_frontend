import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { initialState } from './state'
import {marcaDataState} from "@/feature/marca/types";

export const marcaSlice = createSlice({
    name: 'marca',
    initialState,
    reducers: {
        setMarcaLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setMarcaResponse: (state: marcaDataState, action: PayloadAction<any>) => {
            state.data = action.payload
        },
        setMarcaSuccess: (state, action: PayloadAction<boolean>) => {
            state.success = action.payload
        },
        setMarcaError: (state: marcaDataState, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        resetMarcaDataError: (state: marcaDataState) => {
            state.error = initialState.error
            state.success = initialState.success
        },
    }
})

export  const {
    setMarcaLoading,
    setMarcaResponse,
    setMarcaSuccess,
    setMarcaError,
    resetMarcaDataError,
} = marcaSlice.actions

export default marcaSlice.reducer
