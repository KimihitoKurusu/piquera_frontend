/* eslint-disable no-unused-vars */
import React from 'react'
import styles from './CustomInputDecimal.module.scss'
import { Form, InputNumber, InputNumberProps, Select } from 'antd'
const { Option } = Select

interface CustomInputDecimalProps extends InputNumberProps {
  required?: boolean,
  placeholder: string,
  name: string,
  hasCurrency?: boolean,
  handleCurrencyChange?: (value: string) => void
  defautlCurrencyValue?: string,
  allowAllDecimals?: boolean
  children?: React.ReactNode
}

const CustomInputDecimal: React.FC<CustomInputDecimalProps> = (props) => {
  const {
    required = false,
    placeholder, name,
    hasCurrency = false,
    handleCurrencyChange = null,
    defautlCurrencyValue = null,
    allowAllDecimals = false,
    ...restProps
  } = props

  const currencySelect = (
      <label>CUP</label>
  )

  const getRules = () => {
    const requiredRule = { required, message: 'Este campo es requerido' }
    if (allowAllDecimals) return [{ ...requiredRule }]
    return [
      { ...requiredRule },
      {
        pattern: /^[0-9]{1,11}(?:\.[0-9]{1,2})?$/,
        message: 'Solo se permiten 2 decimales',
      }
    ]
  }

  return (
    <>
      <Form.Item
        name={name}
        rules={getRules()}
      >
        <InputNumber
          type={'number'}
          placeholder={placeholder}
          className={styles['custom-input-number']}
          size='large'
          addonAfter={hasCurrency ? currencySelect : null}
          {...restProps}
        />
      </Form.Item>
    </>
  )
}

export default CustomInputDecimal
