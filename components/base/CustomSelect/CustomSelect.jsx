import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { animals } from "./data";

export default function CustomSelect({type,content}) {

	return (
		<div className="w-full flex flex-col gap-4">
			<Select
				variant="underlined"
				label={type}
				className="max-w-xs">
				{axiosApi}
			</Select>
		</div>
	);
}
