import React, {useEffect} from 'react';
import {Button, Col, Form, Row, Select, Typography} from 'antd';
import {CustomInputNumber, CustomSelect, CustomTextInput} from "@/components";
import toast from 'react-hot-toast';
import axiosApi from "@/config/axios";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {getAllMarcaData} from "@/redux/marca/actions";
import {CloseOutlined, FlagTwoTone, ToolOutlined} from "@ant-design/icons";

const {Title} = Typography;


const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
}

const TaxiForm: React.FC = ({setIsModalVisible, editItem, getAllTaxiData}) => {
    const dispatch = useDispatch()
    const {data: marcaData, isLoading} = useSelector((state: RootState) => state.marca)
    const [form] = Form.useForm()
    console.log('editItem', editItem)
    const initialsFormData = {
        ['marca']: editItem?.marca_id || '',
        ['id']: editItem?.id || '',
        ['capacidad']: editItem?.capacidad || 1,
        ['chofer']: editItem?.chofer || '',
        ['estado']: editItem?.estado || '',
    }
    useEffect(() => {
        if (marcaData.length === 0 && !isLoading) {
            dispatch(getAllMarcaData())
        }

    }, [dispatch, marcaData, isLoading])

    useEffect(() => {
        form.setFieldsValue(initialsFormData)
    }, [])

    const onFinish = async (values: any) => {
        console.log(values.marca)
        const formData = {
            id: values.id,
            marca_id: Number(values.marca.split(' ')[0]),
            capacidad: values.capacidad,
            chofer: values.chofer,
            estado: values.estado,
        };
        console.log(formData)
        if (!editItem) {
            try {
                const resp = await axiosApi.post('piquera/taxi/', formData);
                if (resp.status === 201) {
                    toast.success('Taxi Registrado Sactifactoriamente!', {position: 'top-right',});
                    form.setFieldsValue(initialsFormData)
                    setIsModalVisible(false)
                    getAllTaxiData()
                }
            } catch (error) {
                console.error('Error:', error?.response?.data);
                toast.error('Upss, algo ha fallado', {position: 'top-right',});
            }
        } else {
            try {
                const resp = await axiosApi.put(`piquera/taxi/${editItem.id}/`, formData);
                if (resp.status === 200) {
                    toast.success('Taxi Editado Sactifactoriamente!', {position: 'top-right',});
                    form.setFieldsValue(initialsFormData)
                    setIsModalVisible(false)
                }
            } catch (error) {
                toast.error('Upss, algo ha fallado!', {position: 'top-right',});
            }
        }
        getAllTaxiData()
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
                <Title level={5}>Marca: </Title>
                <CustomSelect
                    name={"marca"}
                    required
                    showSearch={true}
                    placeholder={'Seleccione una Marca'}
                >
                    {marcaData.map((item, idx) => {
                        return <Select.Option value={`${item.id} ${item.nombre}`} key={item.id}>
                            <h3>{item.nombre}</h3>
                        </Select.Option>
                    })}
                </CustomSelect>
                <Title level={5}>Matrícula: </Title>
                <CustomTextInput placeholder={'No. de Matrícula '} name={'id'} required/>
                <Title level={5}>Capacidad: </Title>
                <CustomInputNumber placeholder={'Capacidad'} name={'capacidad'} min={1} required/>
                <Title level={5}>Chofer: </Title>
                <CustomTextInput placeholder={'Nombre del Chofer'} name={'chofer'} required/>
                <Title level={5}>Estado: </Title>
                <CustomSelect
                    name={"estado"}
                    required
                    placeholder={'Seleccione un estado'}
                >
                    {[
                        {value: 'Libre', label:'Libre', icon: <FlagTwoTone/>},
                        {value: 'Ocupado', label:'Ocupado', icon: <CloseOutlined style={{color: 'tomato'}} />},
                        {value: 'En reparación', label:'En reparación', icon: <ToolOutlined style={{color: '#ffc53d'}}/>},

                    ].map((item, idx) => {
                        return <Select.Option value={item.value} key={idx}>
                            <h3> <span>{item.icon}</span> {item.label}</h3>
                        </Select.Option>
                    })}
                </CustomSelect>
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

export default TaxiForm;
