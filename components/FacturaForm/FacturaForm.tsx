import React, { useEffect, useState } from "react";
import {
	Button,
	Checkbox,
	Col,
	ConfigProvider,
	DatePicker,
	Divider,
	Flex,
	Form,
	Row,
	Select,
	Typography,
} from "antd";
import { CustomSelect } from "@/components";
import axiosApi from "@/config/axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import moment from "moment";
import dayjs from "dayjs";

const { Title } = Typography;


const onFinishFailed = (errorInfo: any) => {
	console.log("Failed:", errorInfo);
};

const FacturaForm: React.FC = () => {
	const [form] = Form.useForm();
	const [allApiData, setAllApiData] = useState(null);
	const [factura, setFactura] = useState(null)

	const fetchData = async () => {
		try {
			const [marcaData, taxiData, clienteData, sviajeData] =
				await Promise.all([
					axiosApi.get("piquera/marca/"),
					axiosApi.get("piquera/taxi/"),
					axiosApi.get("piquera/cliente/"),
					axiosApi.get("piquera/sviaje/"),
				]);
			return {
				marca: marcaData.data,
				taxi: taxiData.data,
				cliente: clienteData.data,
				sviaje: sviajeData.data,
			};
		} catch (error) {
			toast.error(`Upss, algo ha fallado!`, { position: "top-right" });
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		if (!allApiData) {
			fetchData().then((result) => {
				console.log(result);
				setAllApiData(result);
			});
		}
	}, [allApiData]);

	const onFinish = (values: any) => {
		const formData = {
			cliente: Number(values.cliente.split(";")[0]),
			date: values.reserva_date,
		};
	};

	return (
		<Form
			name="basic"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			style={{ maxWidth: 600 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
			form={form}>
			<Flex vertical={true} gap={"large"} align="left">
				<Title level={5}>Cliente Objetivo: </Title>
				<CustomSelect
					name={"cliente"}
					required
					showSearch={true}
					placeholder="Seleccione un cliente">
					{allApiData?.cliente.map((item, idx) => {
						return (
							<Select.Option
								value={`${item.id};${item.nombre}`}
								key={item.id}>
								<h3>{item.nombre}</h3>
							</Select.Option>
						);
					})}
				</CustomSelect>
				<Title level={5}>Mes de Factura: </Title>
				<Form.Item name={"reserva_date"} required>
					<DatePicker picker={"month"} />
				</Form.Item>
				<Form.Item name={"reserva_date"} required>
					<Divider />
				</Form.Item>
				<Button type="primary" htmlType="submit">Generar Factura</Button>
			</Flex>
		</Form>
	);
};

export default FacturaForm;
