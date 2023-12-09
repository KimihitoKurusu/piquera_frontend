"use client";
import { CustomSelect, CustomTable } from "@/components/";
import React, { useEffect, useState } from "react";
import { facturaColumns } from "@/feature";
import toast, { Toaster } from "react-hot-toast";
import axiosApi from "@/config/axios";
import { Button, Divider, Flex, Form, Select } from "antd";
import moment, { Moment } from "moment";
import DatePicker from "antd/es/date-picker";
import Title from "antd/es/typography/Title";
import { log } from "console";

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

export default function FacturaPage() {
	const [editItem, setEditItem] = useState(null);
	const [modalTitle, setModalTitle] = useState("");
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [allApiData, setAllApiData] = useState(null);
	const [factura, setFactura] = useState([]);

	useEffect(() => {
		if (!allApiData) {
			fetchData().then((result) => {
				setAllApiData(result);
			});
		}
	}, [allApiData]);

	const calculateCulminacionDate = (sViaje) => {
		const marcaId = allApiData?.taxi.find(
			(taxi) => taxi.id === sViaje?.taxi
		).marca_id;
		const tiempoKM = allApiData?.marca.find(
			({ id }) => marcaId === id
		).tiempo_km;
		return moment(sViaje?.recogida_date).add(
			sViaje?.distancia * tiempoKM,
			"seconds"
		);
	};

	const calculatePrecio = (sViaje) => {
		const marcaId = allApiData?.taxi.find(
			(taxi) => taxi.id === sViaje?.taxi
		).marca_id;
		const precioKM = allApiData?.marca.find(
			({ id }) => marcaId === id
		).precio_km;
		return sViaje?.distancia * precioKM;
	};

	const facturaData = (cliente: string, date: Moment) => {
		if (!!cliente) {
			allApiData?.sviaje.map((sViaje) => {
				const factura = {
					taxi: sViaje?.taxi,
					distancia: sViaje?.distancia,
					destino: sViaje?.destino,
					recogida_date: sViaje?.recogida_date,
					culminacion_date: calculateCulminacionDate(sViaje),
					cant_personas: sViaje?.cant_personas,
					precio: calculatePrecio(sViaje),
				};
				if (
					sViaje?.completado &&
					sViaje.cliente === Number(cliente?.split(';')[0]) &&
					moment(sViaje?.recogida_date).month() ===
						moment(date).month()
				) {
					return factura;
				}
			});
		}
		return [];
	};

	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		console.log('values', values)
	};

	return (
		<>
			<Flex vertical={false} gap={"large"}>
				<Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					autoComplete="off"
					form={form}>
					<Flex vertical={true} gap={"large"} align="left">
						<Title level={5}>Cliente Objetivo: </Title>
						<CustomSelect
							name={"cliente"}
							required
							defaultActiveFirstOption
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
						<Form.Item name={"recogida_date"} required>
							<DatePicker
								picker={"month"}
								defaultValue={moment("MM-YYYY")}
							/>
						</Form.Item>
						<Divider />
						<Form.Item>
							<Button type="primary" htmlType="submit">
								Generar Factura
							</Button>
						</Form.Item>
					</Flex>
				</Form>
				<Divider type="vertical" />
				<div>
					<Toaster
						toastOptions={{
							className: "",
							style: {
								border: "1px solid #713200",
								padding: "16px",
								color: "#713200",
							},
						}}
					/>
					<CustomTable
						rows={facturaData(4)}
						columns={facturaColumns}
						type="factura"
						filterKey="destino"
						setIsModalVisible={setIsModalVisible}
						setModalTitle={setModalTitle}
						setEditItem={setEditItem}
					/>
				</div>
			</Flex>
		</>
	);
}
