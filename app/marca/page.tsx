"use client"
import {CustomTable, MarcaForm} from "@/components/"
import React, {useEffect, useState} from "react"
import { useSelector, useDispatch } from 'react-redux'
import {marcaColumns} from "@/feature";
import {Modal} from "antd";
import {Toaster} from "react-hot-toast";
import {getAllMarcaData} from "@/redux/marca/actions";
import {RootState} from "@/store/store";

export default function MarcaPage() {
    const dispatch = useDispatch()
    const { data: marcaData, isLoading, error} = useSelector((state: RootState) => state.marca)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [modalTitle, setModalTitle] = useState('Insertar')
    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        if (marcaData.length === 0 && !isLoading){
            dispatch(getAllMarcaData())
        }

    }, [dispatch, marcaData, isLoading])

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
                type='marca'
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
               <MarcaForm setIsModalVisible={setIsModalVisible} editItem={editItem}/>
            </Modal>
        </>
    )
}
