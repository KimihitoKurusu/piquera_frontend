import React, {useState} from 'react'
import {Checkbox, CheckboxProps, Form, Input} from 'antd'
import {CustomText, CustomTitle} from '@/components'
import type {CheckboxChangeEvent} from 'antd/es/checkbox'
import styles from "@/components/base/CustomTextInput/CustomTextInput.module.scss";

interface CustomCheckBoxProps extends CheckboxProps {
    defaultValue: boolean,
    text: string,
    // eslint-disable-next-line no-unused-vars
    handleChange?: (value: boolean) => void
    disabled?: boolean
    isSmallText?: boolean
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = (props) => {
    const {name, defaultValue, text, handleChange = null, disabled = false, isSmallText = false, ...restProps} = props
    const [checked, setChecked] = useState(defaultValue);
    const handleOnChange = (e: CheckboxChangeEvent) => {
        console.log(e.target.checked)
        if (handleChange) {
            handleChange(e.target.checked)
        }
        setChecked(!checked)
    }

    return (

        <Form.Item
            name={name}
        >
            <Checkbox
                onChange={handleOnChange}
                checked={checked}
                disabled={disabled}
            >
                {isSmallText ? <CustomText label={text}/> : <CustomTitle label={text}/>}
            </Checkbox>
        </Form.Item>

    )

}
export default CustomCheckBox
