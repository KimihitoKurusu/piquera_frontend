"use client"
import { title } from "@/components/primitives";
import CustomTable from "@/components/CustomTable/CustomTable";
import * from "@/components/CCustomTable/App";
import { useEffect, useState } from "react";
import axiosApi from '@/config/axios';
export default function MarcaPage() {

    const [marcaData, setMarcaData] = useState(null)
    useEffect(() => {
        axiosApi.get('piquera/marca/').then(({data}) => {
            setMarcaData(data)
            
        })
    })
    const cols = [
//        {
//            key: "id",
//            label: "ID",
//        },
        {
            key: "nombre",
            label: "Nombre",
        },
        {
            key: "tiempo_km",
            label: "Tiempo por KM",
        },
        {
            key: "precio_km",
            label: "Precio por KM",
        },
    ];

	return (
        <div>
            <CustomTable rows={marcaData} columns={cols}/>
            <App/>
        </div>
	);
}
