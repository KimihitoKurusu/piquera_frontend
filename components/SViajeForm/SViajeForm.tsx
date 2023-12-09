import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Col, ConfigProvider, DatePicker, Form, Row, Select, Typography} from 'antd';
import {CustomCheckBox, CustomInputDecimal, CustomInputNumber, CustomSelect, CustomTextInput} from "@/components";
import toast from 'react-hot-toast';
import axiosApi from "@/config/axios";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {getAllMarcaData} from "@/redux/marca/actions";
import moment from "moment";
import locale from "antd/lib/locale/es_ES";
import {RangePickerProps} from "antd/es/date-picker";
import dayjs from "dayjs";

const {Title} = Typography;


const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().endOf('day');
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
}

const fetchData = async () => {
    try {
        const [marcaData, taxiData, clienteData, sviajeData] = await Promise.all([
            axiosApi.get('piquera/marca/'),
            axiosApi.get('piquera/taxi/'),
            axiosApi.get('piquera/cliente/'),
            axiosApi.get('piquera/sviaje/'),
        ]);
        return {
            marca: marcaData.data,
            taxi: taxiData.data,
            cliente: clienteData.data,
            sviaje: sviajeData.data,
        };
    } catch (error) {
        toast.error(`Upss, algo ha fallado!`, {position: 'top-right'});
        console.error('Error fetching data:', error);
    }
};
const SViajeForm: React.FC = ({setIsModalVisible, editItem, getAllSViajeData}) => {
    const dispatch = useDispatch()
    const {data: marcaData, isLoading} = useSelector((state: RootState) => state.marca)
    const [form] = Form.useForm()
    const [allApiData, setAllApiData] = useState(null)
    const [reservaDate, setReservaDate] = useState(moment().format('YYYY-MM-DDThh:mm'))
    const [recogidaDate, setRecogidaDate] = useState(moment().format('YYYY-MM-DDThh:mm'))
    const [completadoState, setCompletadoState] = useState(false)

    const initialsFormData = {
        ['cliente']: editItem?.cliente || '',
        ['taxi']: editItem?.taxi.split(' ')[0] || '',
        ['recogida_date']: moment(editItem?.recogida_date, "MM/DD/YYYY HH:mm").toDate() || 1,
        ['reserva_date']: moment(editItem?.reserva_date, "MM/DD/YYYY HH:mm").toDate() || '',
        ['destino']: editItem?.destino || '',
        ['cant_personas']: editItem?.cant_personas || '',
        ['distancia']: editItem?.distancia || '',
        ['completado']: editItem?.completado || '',
    }
    useEffect(() => {
        if (!allApiData) {
            fetchData().then((result) => {
                console.log(result)
                setAllApiData(result)
            })
        }
    }, [allApiData])

    useEffect(() => {
        if (marcaData?.length === 0 && !isLoading) {
            dispatch(getAllMarcaData())
        }

    }, [dispatch, marcaData, isLoading])

    useEffect(() => {
        form.setFieldsValue(initialsFormData)
    }, [])


    const handleChangeReserva = (v: moment.Moment) => {
        setReservaDate(v.format('YYYY-MM-DDThh:mm'))
    }
    const handleChangeRecogida = (v: moment.Moment) => {
        setRecogidaDate(v.format('YYYY-MM-DDThh:mm'))
    }

    const onChangeCompletado = (e: CheckboxChangeEvent) => {
        setCompletadoState(e.target.checked)
    }

    const onFinish = async (values: any) => {
        console.log('values', values)
        const formData = {
            cliente: Number(values.cliente.split(';')[0]),
            taxi: values.taxi.split(' ')[0],
            recogida_date: moment(recogidaDate).toISOString(),
            reserva_date: moment(reservaDate).toISOString(),
            destino: values.destino,
            cant_personas: values.cant_personas,
            distancia: values.distancia,
            completado: completadoState,
        };
        console.log('formData', formData)
        if (!editItem) {
            try {
                const resp = await axiosApi.post('piquera/sviaje/', formData);
                if (resp.status === 201) {
                    toast.success('Solicitud de Viaje Registrada Sactifactoriamente!', {position: 'top-right',});
                    form.setFieldsValue(initialsFormData)
                    setIsModalVisible(false)
                    getAllSViajeData()
                }
            } catch (error) {
                console.error('Error:', error?.response?.data);
                toast.error('Upss, algo ha fallado', {position: 'top-right',});
            }
        } else {
            try {
                const resp = await axiosApi.put(`piquera/sviaje/${editItem.id}/`, formData);
                if (resp.status === 200) {
                    toast.success('Solicitud de Viaje Editada Sactifactoriamente!', {position: 'top-right',});
                    form.setFieldsValue(initialsFormData)
                    setIsModalVisible(false)
                }
            } catch (error) {
                toast.error('Upss, algo ha fallado!', {position: 'top-right',});
            }
        }
        getAllSViajeData()
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
            <Col span={12}>
                <Title level={5}>Cliente: </Title>
                <CustomSelect
                    name={"cliente"}
                    required
                    showSearch={true}
                    placeholder='Seleccione un cliente'
                >
                    {allApiData?.cliente.map((item, idx) => {
                        return <Select.Option value={`${item.id};${item.nombre}`} key={item.id}>
                            <h3>{item.nombre}</h3>
                        </Select.Option>
                    })}
                </CustomSelect>
                <Title level={5}>Taxi: </Title>
                <CustomSelect
                    name={"taxi"}
                    required
                    showSearch={true}
                    placeholder='Seleccione un taxi'
                >
                    {allApiData?.taxi.map((item, idx) => {
                        return <Select.Option value={`${item.id} ${item.chofer}`} key={item.id}>
                            <h3>{item.chofer}</h3>
                        </Select.Option>
                    })}
                </CustomSelect>
                <Title level={5}>Fecha de recogida: </Title>

                <Form.Item
                    name={'recogida_date'}
                    rules={[{required: true, message: 'Este campo es requerido'}]}
                >
                    <ConfigProvider locale={locale}>
                        <DatePicker
                            defaultValue={dayjs(editItem?.recogida_date || recogidaDate)}
                            onChange={handleChangeRecogida}
                            disabledDate={disabledDate}
                            showTime={{defaultValue: moment('00:00:00', 'hh:mm:ss')}}
                            placeholder={'Seleccione la fecha de recogida'}
                        />
                    </ConfigProvider>
                </Form.Item>
                <Title level={5}>Fecha de reserva: </Title>
                <Form.Item
                    name={'reserva_date'}
                    rules={[{required: true, message: 'Este campo es requerido'}]}
                >
                    <ConfigProvider locale={locale}>
                        <DatePicker
                            defaultValue={dayjs(editItem?.reserva_date || reservaDate)}
                            onChange={handleChangeReserva}
                            disabledDate={disabledDate}
                            showTime={{defaultValue: moment('00:00:00', 'hh:mm:ss')}}
                            placeholder={'Seleccione la fecha de reserva'}
                        />
                    </ConfigProvider>
                </Form.Item>

            </Col>
            <Col>
                <Title level={5}>Destino: </Title>
                <CustomTextInput placeholder={'Nombre del Chofer'} name={'destino'} required/>
                <Title level={5}>Cantidad de Personas: </Title>
                <CustomInputNumber placeholder={'Cantidad de Personas:'} name={'cant_personas'} min={1} required/>
                <Title level={5}>Distancia </Title>
                <CustomInputDecimal placeholder={'Distancia'} name={'distancia'} min={1} required/>
                <Title level={5}> </Title>
                <Form.Item
                    name={'completado'}
                >
                    <Checkbox
                        defaultValue={editItem?.completado !== 'No'}
                        onChange={onChangeCompletado}
                    >
                        Viaje Completado?
                    </Checkbox>

                </Form.Item>
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

export default SViajeForm;
