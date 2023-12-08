"use client"
import {CustomTable, ClienteForm} from "@/components/"
import React, {useEffect, useState} from "react"
import axiosApi from '@/config/axios'
import {sViajeColumns} from "@/feature";
import {Modal} from "antd";
import {Toaster} from "react-hot-toast";
import SViajeForm from "@/components/SViajeForm/SViajeForm";

export default function SViajePage() {
    const [sViajeData, setSViajeData] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [modalTitle, setModalTitle] = useState('Insertar')
    const [editItem, setEditItem] = useState(null);

    const getAllSViajeData = () => {
        axiosApi.get('piquera/sviaje/').then(({data}) => {
            setSViajeData(data)
        })
    }

    useEffect(() => {
        if (!sViajeData) {
            getAllSViajeData()
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
                rows={sViajeData}
                columns={sViajeColumns}
                setIsModalVisible={setIsModalVisible}
                setModalTitle={setModalTitle}
                setEditItem={setEditItem}
                getAllData={getAllSViajeData}
                type='sviaje'
                filterKey={['cliente', 'taxi', 'completado']}
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
               <SViajeForm setIsModalVisible={setIsModalVisible} editItem={editItem} getAllSViajeData={getAllSViajeData}/>
            </Modal>
        </>
    )
}
