"use client"
import {CustomTable, ClienteForm} from "@/components/"
import React, {useEffect, useState} from "react"
import axiosApi from '@/config/axios'
import {taxiColumns} from "@/feature";
import {Modal} from "antd";
import {Toaster} from "react-hot-toast";

export default function TaxiPage() {
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
               <ClienteForm setIsModalVisible={setIsModalVisible} editItem={editItem} getAllClienteData={getAllTaxiData}/>
            </Modal>
        </>
    )
}
