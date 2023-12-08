/* eslint-disable no-unused-vars */
import React from 'react'
import { Select, Form, SelectProps } from 'antd'
import type { DefaultOptionType } from 'antd/lib/select'

interface CustomSelectProps extends SelectProps {
	onChange?: (value: number | string | number[]) => void
		name?: string
	required?: boolean
	manageFiltering?: (input: string, option: DefaultOptionType) => boolean
	showSearch?: boolean
}

const CustomSelect: React.FC<CustomSelectProps> = (props) => {
	const {
		name = '',
		onChange = null,
		required = false,
		manageFiltering = null,
		showSearch = false,
		children,
		...restProps
	} = props

	const rules = [{ required, message: 'Este campo es requerido'}]

	const onChangeValue = (value: number | string) => {
		if (onChange !== null) {
			onChange(value)
		}
	}

	const handleFilterOption = (input: string, option: DefaultOptionType): boolean => {
		if (!manageFiltering) {
			return (option.children?.props?.children as unknown as string)?.toLowerCase()?.includes(input?.toLowerCase())
		}
		return manageFiltering(input, option)
	}

	return (
		<Form.Item name={name} rules={rules}>
			<Select
				{...restProps}
				showSearch={showSearch}
				optionFilterProp='children'
				size='large'
				className='select-input'
				onChange={onChangeValue}
				filterOption={(input, option) => handleFilterOption(input, option)}
			>
				{children}
			</Select>
		</Form.Item>

	)
}

export default CustomSelect
