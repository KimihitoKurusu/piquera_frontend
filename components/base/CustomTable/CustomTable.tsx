import React, { useEffect, useMemo, useState } from "react";
import {
	Button,
	Input,
	Pagination,
	Selection,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip,
} from "@nextui-org/react";
import { PlusIcon } from "@/components/base/CustomTable/PlusIcon";
import { SearchIcon } from "@/components/base/CustomTable/SearchIcon";
import {
	CheckCircleTwoTone,
	CloseCircleTwoTone,
	CloseOutlined,
	ExclamationCircleFilled,
	FlagTwoTone,
	ToolOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import axiosApi from "@/config/axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { resetMarcaDataError } from "@/redux/marca/slice";
import { getAllMarcaData } from "@/redux/marca/actions";
import { RootState } from "@/store/store";
import moment from "moment";
import { DeleteIcon } from "@/components/base/CustomTable/DeleteIcon";
import { EditIcon } from "@/components/base/CustomTable/EditIcon";
import CustomTitle from "../CustomTitle/CustomTitle";

const { confirm } = Modal;

interface CustomTableProps {
	rows: any[] | null;
	columns: { key: string; label: string }[];
	itemsPerPage?: number;
	setIsModalVisible: (value: boolean) => void;
	setModalTitle: (value: string) => void;
	setEditItem: (value: any) => void;
	getAllData?: () => void;
	type: string;
	filterKey: string | string[];
	totalPrice: any
}

const stateValues = {
	Libre: {
		icon: <FlagTwoTone />,
		label: "Libre",
		color: "primary",
	},
	Ocupado: {
		icon: <CloseOutlined style={{ color: "tomato" }} />,
		label: "Ocupado",
		color: "danger",
	},
	"En reparación": {
		icon: <ToolOutlined style={{ color: "#ffc53d" }} />,
		label: "En reparación",
		color: "warning",
	},
};

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

const CustomTable: React.FC<CustomTableProps> = (props) => {
	const dispatch = useDispatch();
	const { data: marcaData } = useSelector((state: RootState) => state.marca);
	const {
		rows,
		columns,
		itemsPerPage = 10,
		setIsModalVisible,
		setModalTitle,
		setEditItem,
		type,
		filterKey,
		getAllData = () => {},
		totalPrice,
		clientName,
		...otherProps
	} = props;
	const [page, setPage] = useState(1);
	const [allApiData, setAllApiData] = useState(null);
	const [filterValue, setFilterValue] = React.useState("");
	const [rowsPerPage] = React.useState(10);
	const [statusFilter] = React.useState<Selection>("all");

	useEffect(() => {
		if (!allApiData) {
			fetchData().then((result) => {
				setAllApiData(result);
			});
		}
	}, [allApiData]);

	const showConfirm = ({ id }) => {
		confirm({
			title: "Estas seguro de deseas cancelar esta Solicitud de Viaje?",
			icon: <ExclamationCircleFilled />,
			okType: "danger",
			onOk() {
				axiosApi
					.delete(`/piquera/${type}/${id}/`)
					.then((resp) => {
						if (resp.status === 204) {
							toast.success(
								"Elemento Eliminado Sactifactoriamente!",
								{ position: "top-right" }
							);
							dispatch(getAllMarcaData());
							getAllData();
						}
					})
					.catch((error) => {
						console.error("Error:", error.response.data);
						toast.error("Upss, algo ha fallado!", {
							position: "top-right",
						});
					});
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	const hasSearchFilter = Boolean(filterValue);

	const filteredItems = React.useMemo(() => {
		let filtered = [...(rows || [])];

		const hasContPer = filtered.some(
			(item) => typeof item.contPer !== "undefined"
		);
		const hasMarcaId = filtered.some(
			(item) => typeof item.marca_id !== "undefined"
		);
		const hasTaxi = filtered.some(
			(item) => typeof item.taxi !== "undefined"
		);
		const hasClient = filtered.some(
			(item) => typeof item.cliente !== "undefined"
		);
		const hasRecogidaDate = filtered.some(
			(item) => typeof item.recogida_date !== "undefined"
		);
		const hasReservaDate = filtered.some(
			(item) => typeof item.reserva_date !== "undefined"
		);
		const hasCompletado = filtered.some(
			(item) => typeof item.completado !== "undefined"
		);
		// console.log('filtered', filtered, allApiData);

		filtered = filtered.map((item) => {
			let newItem = { ...item };

			if (hasMarcaId && typeof item.marca_id !== "undefined") {
				const { id, nombre } = marcaData.find(
					({ id }) => id === item.marca_id
				);
				newItem = { ...newItem, marca_id: `${id} ${nombre}` };
			}

			if (hasTaxi && typeof item.taxi !== "undefined") {
				const taxiInfo = allApiData?.taxi.find(
					({ id }) => id === item.taxi
				);
				newItem = {
					...newItem,
					taxi: taxiInfo
						? `${taxiInfo.id} ${taxiInfo.chofer}`
						: item.taxi,
				};
			}

			if (hasClient && typeof item.cliente !== "undefined") {
				const clienteEncontrado = allApiData?.cliente.find(
					({ id }) => id === item.cliente
				);
				if (clienteEncontrado) {
					const { id, nombre } = clienteEncontrado;
					newItem = { ...newItem, cliente: `${id};${nombre}` };
				}
			}

			if (hasRecogidaDate && hasReservaDate) {
				newItem = {
					...newItem,
					recogida_date: moment(item.recogida_date).format(
						"MM/DD/YYYY hh:MM"
					),
					reserva_date: moment(item.reserva_date).format(
						"MM/DD/YYYY hh:MM"
					),
				};
			}

			if (hasCompletado && typeof item.completado !== "undefined") {
				newItem = {
					...newItem,
					completado: item.completado ? "Sí" : "No",
				};
			}

			if (hasContPer && typeof item.contPer !== "undefined") {
				newItem = { ...newItem, contPer: item.contPer ? "Sí" : "No" };
			}

			return newItem;
		});

		if (hasSearchFilter && filterKey) {
			filtered = filtered.filter((item) => {
				const valuesToFilter = Array.isArray(filterKey)
					? filterKey.map((key) => item[key])
					: [item[filterKey]];
				return valuesToFilter.some((value) =>
					value
						? value
								.toLowerCase()
								.includes(filterValue.toLowerCase())
						: false
				);
			});
		}

		return filtered;
	}, [rows, filterValue, statusFilter, filterKey]);

	const pages = Math.ceil(filteredItems.length / rowsPerPage);

	const onPreviousPage = React.useCallback(() => {
		if (page > 1) {
			setPage(page - 1);
		}
	}, [page]);

	const onNextPage = React.useCallback(() => {
		if (page < pages) {
			setPage(page + 1);
		}
	}, [page, pages]);

	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	const paginatedRows = useMemo(() => {
		return filteredItems.slice(startIndex, endIndex);
	}, [filteredItems, startIndex, endIndex]);

	const onSearchChange = React.useCallback((value?: string) => {
		if (value) {
			setFilterValue(value);
			setPage(1);
		} else {
			setFilterValue("");
		}
	}, []);

	const onClear = React.useCallback(() => {
		setFilterValue("");
		setPage(1);
	}, []);

	const topContent = React.useMemo(() => {
		if (type.split(" ")[0] === "factura") {
			if (type.split(" ").length === 2) {
				return (
					<CustomTitle
						label={type.split(clientName)[1]}
						level={2}></CustomTitle>
				);
			} else {
				return (
					<CustomTitle
						label={
							"Seleccione un Cliente y un Mes para generar su Factura"
						}
						level={2}></CustomTitle>
				);
			}
		}

		return (
			<div className="flex flex-col gap-4">
				<div className="flex justify-between gap-3 items-end">
					<Input
						isClearable
						className="w-full sm:max-w-[44%]"
						placeholder="Search by name..."
						startContent={<SearchIcon />}
						value={filterValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
						size={"sm"}
					/>
					<div className="flex gap-3">
						<Button
							color="primary"
							onClick={() => {
								setEditItem(null);
								setIsModalVisible(true);
								dispatch(resetMarcaDataError());
							}}
							endContent={<PlusIcon />}>
							Insertar
						</Button>
					</div>
				</div>
			</div>
		);
	}, [filterValue, statusFilter, onSearchChange, hasSearchFilter]);

	const bottomContent = React.useMemo(() => {
		if (type.split(" ")[0] === "factura") {
			if (type.split(" ").length === 2) {
				return (
					<CustomTitle
						label={type.split(" ")[1]}
						level={2}></CustomTitle>
				);
			} else {
				return (
					<CustomTitle
						label={
							`Total: ${totalPrice} CUP`
						}
						level={2}></CustomTitle>
				);
			}
		}
		return (
			<div className="py-2 px-2 flex justify-between items-center">
				<Pagination
					isCompact
					showControls
					showShadow
					color="primary"
					page={page}
					total={pages}
					onChange={setPage}
				/>
				<div className="hidden sm:flex w-[30%] justify-end gap-2">
					<Button
						isDisabled={pages === 1}
						size="sm"
						variant="flat"
						onPress={onPreviousPage}>
						Previous
					</Button>
					<Button
						isDisabled={pages === 1}
						size="sm"
						variant="flat"
						onPress={onNextPage}>
						Next
					</Button>
				</div>
			</div>
		);
	}, [page, pages, hasSearchFilter]);

	const getKeyValue = (item, key) => {
		return item[key];
	};

	const renderClienteCell = (item) => {
		return item?.cliente.split(";")[1];
	};

	const renderBooleanCell = (flag: boolean) =>
		flag ? (
			<CheckCircleTwoTone twoToneColor="#52c41a" />
		) : (
			<CloseCircleTwoTone twoToneColor="#eb2f96" />
		);

	const renderCellContent = (item, column) => {
		const { key } = column;
		const flag = item?.contPer || item?.completado;
		if (["contPer", "completado"].includes(key)) {
			return renderBooleanCell(flag !== "No");
		}
		if (key === "cliente") {
			return renderClienteCell(item);
		}
		if (key === "estado") {
			return renderEstadoCell(item);
		}
		if (key === "actions") {
			return renderActionsCell(item);
		}
		return !!item["marca_id"]
			? getKeyValue(
					{ ...item, marca_id: item.marca_id.split(" ")[1] },
					key
			  )
			: getKeyValue(item, key);
	};

	const renderEstadoCell = (item) => (
		<Tooltip
			color={stateValues[item.estado]?.color}
			content={stateValues[item.estado]?.label}
			variant="faded">
			{stateValues[item.estado]?.icon}
		</Tooltip>
	);

	const renderActionsCell = (item) => (
		<div className="relative flex items-center gap-2">
			<Tooltip content="Editar">
				<span
					onClick={() => handleEdit(item)}
					className="text-lg text-default-400 cursor-pointer active:opacity-50">
					<EditIcon />
				</span>
			</Tooltip>
			{!!item["distancia"] && (
				<Tooltip color="danger" content="Cancelar">
					<span
						onClick={() => showConfirm(item)}
						className="text-lg text-danger cursor-pointer active:opacity-50">
						<DeleteIcon />
					</span>
				</Tooltip>
			)}
		</div>
	);

	const handleEdit = (item) => {
		setModalTitle("Editar");
		setIsModalVisible(true);
		setEditItem(item);
		dispatch(resetMarcaDataError());
	};
	return (
		<div className="flex flex-col gap-3">
			<Table
				aria-label="Rows actions table example with dynamic content"
				topContent={topContent}
				bottomContent={bottomContent}
				topContentPlacement="outside">
				<TableHeader columns={columns}>
					{columns.map((column: { key: any; label: any }) => (
						<TableColumn
							key={column.key}
							align={
								column.key === "actions" ? "center" : "start"
							}>
							{column.label}
						</TableColumn>
					))}
				</TableHeader>
				<TableBody>
					{paginatedRows?.map((item) => (
						<TableRow key={item.id}>
							{columns.map((column) => (
								<TableCell key={column.key}>
									{renderCellContent(item, column)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default CustomTable;
