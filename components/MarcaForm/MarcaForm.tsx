import React, {useEffect} from 'react';
import {Button, Col, Form, Row, Typography} from 'antd';
import {CustomInputDecimal, CustomInputNumber, CustomTextInput} from "@/components";
import toast, { Toaster } from 'react-hot-toast';
import axiosApi from "@/config/axios";
import {fontMono} from "@/config/fonts";

const {Title} = Typography;


const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
}

const MarcaForm: React.FC = ({setIsModalVisible, editItem, getAllMarcaData}) => {
    const [form] = Form.useForm()
    const initialsFormData = {
        ['nombre']: editItem?.nombre || '',
        ['tiempoKm']: editItem?.tiempo_km || 0,
        ['precioKm']: editItem?.precio_km || 0,
    }
    useEffect(() => {
        form.setFieldsValue(initialsFormData)
    }, [])

    const onFinish = async (values: any) => {
        const formData = {
            nombre: values.nombre,
            tiempo_km: values.tiempoKm,  // Asegúrate de que la propiedad sea tiempoKm
            precio_km: values.precioKm  // Asegúrate de que la propiedad sea precioKm
        };
        if (!editItem){
            try {
                const resp = await axiosApi.post('piquera/marca/', formData);
                if (resp.status === 201){
                    toast.success('Marca Creada Sactifactoriamente!', {position: 'top-right',});
                    form.setFieldsValue(initialsFormData)
                    setIsModalVisible(false)
                }
            } catch (error) {
                console.error('Error:', error.response.data);
                toast.error('Upss, algo ha fallado',{position: 'top-right',});
            }
        }else {
            try {
                const resp = await axiosApi.put(`piquera/marca/${editItem.id}/`, formData);
                if (resp.status === 201){
                    toast.success('Marca Modificada Sactifactoriamente!', {position: 'top-right',});
                    form.setFieldsValue(initialsFormData)
                    setIsModalVisible(false)
                }
                console.log('Success:', values, resp);
            } catch (error) {
                console.error('Error:', error.response.data);
                toast.error('Upss, algo ha fallado!',{position: 'top-right',});
            }
            getAllMarcaData()
        }
    };
    return <Form
        name="basic"
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        style={{maxWidth: 600}}
        initialValues={{remember: true}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
    >
        <Row>
            <Col span={24}>
                <Title level={5}>Nombre: </Title>
                <CustomTextInput
                    name={'nombre'}
                    placeholder={'Nombre de la Marca'}
                    required
                />
                <Title level={5}>Tiempo por km (segundos): </Title>
                <CustomInputNumber
                    name={'tiempoKm'}
                    placeholder={'Tiempo por km (segundos)'}
                    required
                />
                <Title level={5}>Precio por km: </Title>
                <CustomInputDecimal
                    name={'precioKm'}
                    placeholder={'Precio por km'}
                    required
                    hasCurrency
                />
            </Col>
        </Row>
        <Row>
            <Col span={4} offset={16}>
                <Button color="danger" variant="ghost" onClick={() => setIsModalVisible(false)}>
                    Cancel
                </Button>
            </Col>
            <Col>

                <Form.Item>
                    <Button type={'primary'} style={{backgroundColor: '#4096ff'}} htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Col>
        </Row>
    </Form>
};

export default MarcaForm;
