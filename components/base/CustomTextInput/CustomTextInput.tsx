import React from 'react'
import type { Rule } from 'antd/lib/form'
import { PlusOutlined } from '@ant-design/icons'
import styles from './CustomTextInput.module.scss'
import { Input, Form, Tooltip, Button, InputProps } from 'antd'

interface CustomTextInputProps extends InputProps {
    name: string,
    required?: boolean,
    placeholder?: string,
    type?: string,
    handleToggleClick?: () => void,
    toogleText?: string,
    disabled?: boolean,
    noSpacedAllowed?: boolean
    minLengthAllowed?: number
    // eslint-disable-next-line no-unused-vars
    onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomTextInput: React.FC<CustomTextInputProps> = (props) => {
    const {
        name, required = false, placeholder,
        type = null,
        handleToggleClick = null,
        toogleText = '',
        disabled = false,
        onChange = null,
        noSpacedAllowed = false,
        minLengthAllowed = null,
        ...restProps
    } = props

    const handleOnChange = (value: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange !== null) {
            onChange(value)
        }
    }

    const getRules = (): Rule[] => [{ required, message: 'This field is required', whitespace: true }]

    return (
        <Form.Item
            name={name}
            rules={getRules()}
        >
            <Input
                placeholder={placeholder}
                size='large'
                onChange={handleOnChange}
                className={styles['custom-input']}
                disabled={disabled}
                {...restProps}
            />
        </Form.Item>
    )
}

export default CustomTextInput
