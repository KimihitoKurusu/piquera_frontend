import React, {useMemo, useState} from "react"
import {
	Button,
	getKeyValue,
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
} from "@nextui-org/react"
import {EditIcon} from "./EditIcon"
import {DeleteIcon} from "./DeleteIcon"
import {PlusIcon} from "@/components/base/CustomTable/PlusIcon";
import {SearchIcon} from "@/components/base/CustomTable/SearchIcon";
import {CustomConfirmModal} from "@/components";
import {ExclamationCircleFilled} from "@ant-design/icons";
import {Modal} from 'antd';
import axiosApi from "@/config/axios";
import toast from "react-hot-toast";

const {confirm} = Modal;


interface CustomTableProps {
	rows: any[] | null
	columns: { key: string; label: string }[]
	itemsPerPage?: number
	setIsModalVisible: (value: boolean) => void
	setModalTitle: (value: string) => void
	setEditItem: (value: any) => void
	getAllMarcaData: () => void
}

const CustomTable: React.FC<CustomTableProps> = (props) => {
	const {rows, columns, itemsPerPage = 10, setIsModalVisible, setModalTitle, setEditItem, getAllMarcaData} = props
	const [page, setPage] = useState(1)
	const [filterValue, setFilterValue] = React.useState("")
	const [rowsPerPage] = React.useState(10)
	const [statusFilter] = React.useState<Selection>("all")

	const showConfirm = ({id}) => {
		confirm({
			title: 'Estas seguro de deseas eliminar este elemento?',
			icon: <ExclamationCircleFilled/>,
			okType: 'danger',
			onOk() {
				axiosApi.delete(`/piquera/marca/${id}/`).then((resp) => {
					if (resp.status === 204) {
						toast.success('Marca Eliminada Sactifactoriamente!', {position: 'top-right',})
						getAllMarcaData()
					}
				}).catch((error)=>{
					console.error('Error:', error.response.data);
					toast.error('Upss, algo ha fallado!',{position: 'top-right',});
				})
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	};


	const hasSearchFilter = Boolean(filterValue)

	const filteredItems = React.useMemo(() => {
		let filtered = [...(rows || [])]

		if (hasSearchFilter) {
			filtered = filtered.filter(
				(user) =>
					user.name &&
					user.name.toLowerCase().includes(filterValue.toLowerCase())
			)
		}
		return filtered
	}, [rows, filterValue, statusFilter])

	const pages = Math.ceil(filteredItems.length / rowsPerPage)

	const onPreviousPage = React.useCallback(() => {
		if (page > 1) {
			setPage(page - 1)
		}
	}, [page])

	const onNextPage = React.useCallback(() => {
		if (page < pages) {
			setPage(page + 1)
		}
	}, [page, pages])


	const startIndex = (page - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage

	const paginatedRows = useMemo(() => {
		return filteredItems.slice(startIndex, endIndex)
	}, [filteredItems, startIndex, endIndex])

	const onSearchChange = React.useCallback((value?: string) => {
		if (value) {
			setFilterValue(value);
			setPage(1);
		} else {
			setFilterValue("");
		}
	}, []);


	const onClear = React.useCallback(() => {
		setFilterValue("")
		setPage(1)
	}, [])

	const topContent = React.useMemo(() => {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex justify-between gap-3 items-end">
					<Input
						isClearable
						className="w-full sm:max-w-[44%]"
						placeholder="Search by name..."
						startContent={<SearchIcon/>}
						value={filterValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
						size={'sm'}
					/>
					<div className="flex gap-3">
						<Button color="primary"
								onClick={() => {
									setEditItem(null)
									setIsModalVisible(true)
								}}
								endContent={<PlusIcon/>}>
							Insertar
						</Button>
					</div>
				</div>
			</div>
		);
	}, [
		filterValue,
		statusFilter,
		onSearchChange,
		hasSearchFilter,
	]);

	const bottomContent = React.useMemo(() => {
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
		)
	}, [page, pages, hasSearchFilter])
	return (
		<div className="flex flex-col gap-3">
			<Table
				aria-label="Rows actions table example with dynamic content"
				topContent={topContent}
				bottomContent={bottomContent}
				topContentPlacement="outside"
				onRowAction={(key: any) => alert(`Opening item ${key}...`)}>
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
					{paginatedRows?.map((item: { id: any }) => (
						<TableRow key={item.id}>
							{columns.map((column: { key: any; label: any }) => (
								<TableCell key={column.key}>
									{column.key !== "actions" ? (
										getKeyValue(item, column.key)
									) : (
										<div className="relative flex items-center gap-2">
											<Tooltip content="Editar">
												<span
													onClick={(val) => {
														setModalTitle('Editar')
														setIsModalVisible(true)
														setEditItem(item)
													}}
													className="text-lg text-default-400 cursor-pointer active:opacity-50">
													<EditIcon/>
												</span>
											</Tooltip>
											<Tooltip
												color="danger"
												content="Cancelar">
												<span
													onClick={() => showConfirm(item)}
													className="text-lg text-danger cursor-pointer active:opacity-50">
													<DeleteIcon/>
												</span>
											</Tooltip>
										</div>
									)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)

}

export default CustomTable
