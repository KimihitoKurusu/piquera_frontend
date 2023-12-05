"use client";
import React from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Input,
	Button,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Chip,
	User,
	Pagination,
	Selection,
	ChipProps,
	SortDescriptor,
	getKeyValue,
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { SearchIcon } from "./SearchIcon";
import { columns, users, statusOptions } from "./data";
import { capitalize } from "./utils";
import { propagateServerField } from "next/dist/server/lib/render-server";

interface CustomTableProps {
	rows: any[] | null;
	columns: { key: string; label: string }[];
}

const statusColorMap: Record<string, ChipProps["color"]> = {
	active: "success",
	paused: "danger",
	vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

type User = (typeof users)[0];



const CustomTable: React.FC<CustomTableProps> = (props) => {
	const { rows, columns } = props;
	return (
		<div className="flex flex-col gap-3">
			<Table
				aria-label="Rows actions table example with dynamic content"
                //selectionMode="multiple"
				onRowAction={(key: any) => alert(`Opening item ${key}...`)}>
				<TableHeader columns={columns}>
					{columns.map((column: { key: any; label: any }) => (
						<TableColumn key={column.key}>
							{column.label}
						</TableColumn>
					))}
				</TableHeader>
				<TableBody>
					{rows?.map((item: { id: any }) => (
						<TableRow key={item.id}>
							{columns.map((column: { key: any; label: any }) => (
								<TableCell>
									{getKeyValue(item, column.key)}
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
