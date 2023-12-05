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
                console.log(data)
            })
        }
    })
    const cols = [
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
        {
            key: "actions",
            label: "Acciones",
        },
    ];

	return (
        <div>
            <div>
                <CustomTable rows={marcaData} columns={cols}/>
            </div>

        </div>
	);
}
/**
 * "use client"
 * import { title } from "@/components/primitives";
 * import CustomTable from "@/components/CustomTable/CustomTable";
 * import App from "@/components/CustomTable/CCustomTable";
 * import { useEffect, useState } from "react";
 * import axiosApi from '@/config/axios';
 * import { Roboto_Flex } from "next/font/google";
 * export default function MarcaPage() {
 *
 *     const [marcaData, setMarcaData] = useState(null)
 *     useEffect(() => {
 *         if (!marcaData) {
 *             axiosApi.get('piquera/marca/').then(({data}) => {
 *                 setMarcaData(data)
 *             })
 *         }
 *     })
 *     const cols = [
 *         // {
 *         //   key: "id",
 *         //   label: "ID",
 *         // },
 *         {
 *             key: "nombre",
 *             label: "Nombre",
 *             dataIndex: "nombre",
 *         },
 *         {
 *             key: "tiempo_km",
 *             label: "Tiempo por KM",
 *             dataIndex: "tiempo_km",
 *         },
 *         {
 *             key: "precio_km",
 *             label: "Precio por KM",
 *             dataIndex: "precio_km",
 *         },
 *         {
 *             key: "precio_km_2",
 *             label: "Precio por KM 2",
 *             dataIndex: "precio_km_2",
 *         },
 *         {
 *             key: "precio_km_3",
 *             label: "Precio por KM 3",
 *             dataIndex: "precio_km_3",
 *         },
 *         {
 *             key: "precio_km_4",
 *             label: "Precio por KM 4",
 *             dataIndex: "precio_km_4",
 *         },
 *         {
 *             key: "precio_km_5",
 *             label: "Precio por KM 5",
 *             dataIndex: "precio_km_5",
 *         },
 *         {
 *             key: "precio_km_6",
 *             label: "Precio por KM 6",
 *             dataIndex: "precio_km_6",
 *         },
 *     ];
 *     const antdColumns: ColumnsType<YourDataType> = cols.map(col => ({
 *         title: col.label,
 *         dataIndex: col.dataIndex,
 *         // You can add other properties like sorter, filters, etc. if needed
 *     }));
 *
 *     return (
 *         <>
 *             <CustomTable rows={marcaData} columns={antdColumns}/>
 *         </>
 *     );
 * }
 */
