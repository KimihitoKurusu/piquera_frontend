import React from 'react'
import moment from 'moment'
import es from 'antd/lib/locale/es_ES'
import { useRouter } from 'next/router'
import type { Rule } from 'antd/lib/form'
import styles from './CustomDatePicker.module.scss'
import { ConfigProvider, DatePicker, DatePickerProps, Form } from 'antd'

type CustomDatePickerProps = DatePickerProps & {
  required?: boolean,
  name: string,
  placeholder: string,
  otherRules?: Rule[],
  isDisabledDate?: boolean,
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: moment.Moment) => void
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = (props) => {
  const {
    required = false,
    name,
    placeholder,
    onChange = null,
    otherRules = [],
    ...restProps
  } = props


  const handleChange = (v: moment.Moment) => {
    if (onChange) {
      onChange(v)
    }
  }
  return (
    <>
      <ConfigProvider locale={es}>
        <Form.Item
          name={name}
          rules={[{ required, message: 'Este campo es requerido' }, ...otherRules]}
        >
          <DatePicker
            size='large'
            className={styles['custom-date-picker']}
            placeholder={placeholder}
            onChange={handleChange}
            {...restProps}
          />
        </Form.Item >
      </ConfigProvider>
    </>
  )
}

export default CustomDatePicker
