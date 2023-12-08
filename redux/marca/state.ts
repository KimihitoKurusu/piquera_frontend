import {marcaDataState} from "@/feature/marca/types";

const marcaState: marcaDataState  = {
   isLoading: false,
   data: [],
   success: false,
   error: '',
}

export {  marcaState as initialState }
