"use client"
import {CustomTable, ClienteForm} from "@/components/"
import React, {useEffect, useState} from "react"
import axiosApi from '@/config/axios'
import {clienteColumns} from "@/feature";
import {Modal} from "antd";
import {Toaster} from "react-hot-toast";

export default function ClientePage() {
    const [clienteData, setClienteData] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [modalTitle, setModalTitle] = useState('Insertar')
    const [editItem, setEditItem] = useState(null);

    const getAllClienteData = () => {
        axiosApi.get('piquera/cliente/').then(({data}) => {
            setClienteData(data)
        })
    }

    useEffect(() => {
        if (!clienteData) {
            getAllClienteData()
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
                rows={clienteData}
                columns={clienteColumns}
                setIsModalVisible={setIsModalVisible}
                setModalTitle={setModalTitle}
                setEditItem={setEditItem}
                getAllData={getAllClienteData}
                type='cliente'
                filterKey='nombre'
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
               <ClienteForm setIsModalVisible={setIsModalVisible} editItem={editItem} getAllClienteData={getAllClienteData}/>
            </Modal>
        </>
    )
}
