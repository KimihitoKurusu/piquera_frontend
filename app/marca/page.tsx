"use client"
import {CustomTable} from "@/components/"
import React, {useEffect, useState} from "react"
import axiosApi from '@/config/axios'
import {marcaColumns} from "@/feature";
import {Modal} from "antd";
import MarcaForm from "@/components/MarcaForm/MarcaForm";
import {Toaster} from "react-hot-toast";

export default function MarcaPage() {
    const [marcaData, setMarcaData] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [modalTitle, setModalTitle] = useState('Insertar')
    const [editItem, setEditItem] = useState(null);

    const getAllMarcaData = () => {
        axiosApi.get('piquera/marca/').then(({data}) => {
            setMarcaData(data)
        })
    }

    useEffect(() => {
        if (!marcaData) {
            getAllMarcaData()
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
                rows={marcaData}
                columns={marcaColumns}
                setIsModalVisible={setIsModalVisible}
                setModalTitle={setModalTitle}
                setEditItem={setEditItem}
                getAllMarcaData={getAllMarcaData}
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
               <MarcaForm setIsModalVisible={setIsModalVisible} editItem={editItem} getAllMarcaData={getAllMarcaData}/>
            </Modal>
        </>
    )
}
