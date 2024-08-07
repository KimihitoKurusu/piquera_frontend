import React, {useEffect} from 'react';
import {Button, Col, Form, Row, Typography} from 'antd';
import {CustomInputDecimal, CustomInputNumber, CustomTextInput} from "@/components";
import toast from 'react-hot-toast';
import {insertMarcaDataAction, updateMarcaDataAction} from "@/redux/marca/actions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import * as reducers from "@/redux/marca/slice";

const {Title} = Typography;


const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
}

const MarcaForm: React.FC = ({setIsModalVisible, editItem}) => {
    const dispatch = useDispatch()
    const { success, error } = useSelector((state: RootState) => state.marca)
    const [form] = Form.useForm()
    const initialsFormData = {
        ['nombre']: editItem?.nombre || '',
        ['tiempoKm']: editItem?.tiempo_km || 0,
        ['precioKm']: editItem?.precio_km || 0,
    }
    useEffect(() => {
        form.setFieldsValue(initialsFormData)
        if (success){
            toast.success('Marca Modificada Sactifactoriamente!', {position: 'top-right',});
        }
        if(error){
            toast.error('Upss, algo ha fallado!', {position: 'top-right',});
        }

    }, [dispatch, success, error])

    const onFinish = async (values: any) => {
        const formData = {
            nombre: values.nombre,
            tiempo_km: values.tiempoKm,
            precio_km: values.precioKm
        };
        if (editItem) {
            dispatch(updateMarcaDataAction(editItem.id, formData))
            setIsModalVisible(false)
            return
        }
        dispatch(insertMarcaDataAction(formData))
        setIsModalVisible(false)
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
