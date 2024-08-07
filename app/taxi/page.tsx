"use client"
import {CustomTable, ClienteForm} from "@/components/"
import React, {useEffect, useState} from "react"
import axiosApi from '@/config/axios'
import {taxiColumns} from "@/feature";
import {Modal} from "antd";
import {Toaster} from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {getAllMarcaData} from "@/redux/marca/actions";
import TaxiForm from "@/components/TaxiForm/TaxiForm";

export default function TaxiPage() {
    const dispatch = useDispatch()
    const { data: marcaData, isLoading} = useSelector((state: RootState) => state.marca)
    const [taxiData, setTaxiData] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [modalTitle, setModalTitle] = useState('Insertar')
    const [editItem, setEditItem] = useState(null);

    const getAllTaxiData = () => {
        axiosApi.get('piquera/taxi/').then(({data}) => {
            setTaxiData(data)
        })
    }

    useEffect(() => {
        if (marcaData.length === 0 && !isLoading){
            dispatch(getAllMarcaData())
        }

    }, [dispatch, marcaData, isLoading])

    useEffect(() => {
        if (!taxiData) {
            getAllTaxiData()
        }
    })

	return (
        <>
            <Toaster toastOptions={{
                className: '',
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
            }}
            />
            <CustomTable
                rows={taxiData}
                columns={taxiColumns}
                setIsModalVisible={setIsModalVisible}
                setModalTitle={setModalTitle}
                setEditItem={setEditItem}
                getAllData={getAllTaxiData}
                type='taxi'
                filterKey={['chofer', 'marca_id']}
            />
            <Modal
                title={modalTitle}
                width={600}
                centered
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                destroyOnClose
            >
               <TaxiForm setIsModalVisible={setIsModalVisible} editItem={editItem} getAllTaxiData={getAllTaxiData}/>
            </Modal>
        </>
    )
}
