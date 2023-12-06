import React, { useState, useMemo } from "react";
import {
	ChipProps,
	getKeyValue,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Selection,
	Pagination,
	Button,
} from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
interface CustomTableProps {
	rows: any[] | null;
	columns: { key: string; label: string }[];
	itemsPerPage?: number;
}

const statusColorMap: Record<string, ChipProps["color"]> = {
	active: "success",
	paused: "danger",
	vacation: "warning",
};

const CustomTable: React.FC<CustomTableProps> = (props) => {
	const { rows, columns, itemsPerPage = 10 } = props;
	const [page, setPage] = useState(1);
	const [filterValue] = React.useState("");
	const [rowsPerPage] = React.useState(10);
	const [statusFilter] = React.useState<Selection>("all");

	const hasSearchFilter = Boolean(filterValue);

	const filteredItems = React.useMemo(() => {
		let filtered = [...(rows || [])];

		if (hasSearchFilter) {
			filtered = filtered.filter(
				(user) =>
					user.name &&
					user.name.toLowerCase().includes(filterValue.toLowerCase())
			);
		}
		return filtered;
	}, [rows, filterValue, statusFilter]);

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

	const onPageChange = (newPage: number) => {
		setPage(newPage);
	};

	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	const paginatedRows = useMemo(() => {
		return filteredItems.slice(startIndex, endIndex);
	}, [filteredItems, startIndex, endIndex]);
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
		);
	}, [page, pages, hasSearchFilter]);
	return (
		<div className="flex flex-col gap-3">
			<Table
				aria-label="Rows actions table example with dynamic content"
				bottomContent={bottomContent}
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
												<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
													<EditIcon />
												</span>
											</Tooltip>
											<Tooltip
												color="danger"
												content="Cancelar">
												<span className="text-lg text-danger cursor-pointer active:opacity-50">
													<DeleteIcon />
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
	);
};

export default CustomTable;
