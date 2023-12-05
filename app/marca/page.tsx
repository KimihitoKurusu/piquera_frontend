"use client"
import { title } from "@/components/primitives";
import CustomTable from "@/components/CustomTable/CustomTable";
import App from "@/components/CustomTable/CCustomTable";
import { useEffect, useState } from "react";
import axiosApi from '@/config/axios';
import { Roboto_Flex } from "next/font/google";
export default function MarcaPage() {

    const [marcaData, setMarcaData] = useState(null)
    useEffect(() => {
        if (!marcaData) {
            axiosApi.get('piquera/marca/').then(({data}) => {
                setMarcaData(data)
            })
        }
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
            <div>
                <CustomTable rows={marcaData} columns={cols}/>
                <App/>
            </div>

        </div>
	);
}
