import React, {useEffect} from 'react';
import {Button, Col, Form, Row, Typography} from 'antd';
import {CustomCheckBox, CustomInputDecimal, CustomInputNumber, CustomTextInput} from "@/components";
import toast, { Toaster } from 'react-hot-toast';
import axiosApi from "@/config/axios";
import {fontMono} from "@/config/fonts";
import { log } from 'console';

const {Title} = Typography;


const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
}

const ClienteForm: React.FC = ({setIsModalVisible, editItem, getAllClienteData}) => {
    const [form] = Form.useForm()
    const initialsFormData = {
        ['nombre']: editItem?.nombre || '',
        ['contPer']: editItem?.contPer || false,
    }
    useEffect(() => {
        form.setFieldsValue(initialsFormData)
    }, [])

    const onFinish = async (values: any) => {
        values.contPer = !(values.contPer !== 'No')
        const formData = {
            nombre: values.nombre,
            contPer: values.contPer,
        };
        if (!editItem){
            try {
                const resp = await axiosApi.post('piquera/cliente/', formData);
                if (resp.status === 201){
                    toast.success('Cliente Registrado Sactifactoriamente!', {position: 'top-right',});
                    form.setFieldsValue(initialsFormData)
                    setIsModalVisible(false)
                    getAllClienteData()
                }
            } catch (error) {
                console.error('Error:', error.response.data);
                toast.error('Upss, algo ha fallado',{position: 'top-right',});
            }
        }else {
            try {
                const resp = await axiosApi.put(`piquera/cliente/${editItem.id}/`, formData);
                if (resp.status === 200){
                    toast.success('Cliente Editado Sactifactoriamente!', {position: 'top-right',});
                    form.setFieldsValue(initialsFormData)
                    setIsModalVisible(false)
                }
            } catch (error) {
                toast.error('Upss, algo ha fallado!',{position: 'top-right',});
            }
        }
        getAllClienteData()
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
                    placeholder={'Nombre del Cliente'}
                    required
                />
                <CustomCheckBox
                    text={'Tiene Contrato Permanente?'}
                    name={'contPer'}
                    defaultValue={editItem?.contPer !== 'No'}
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

export default ClienteForm;
