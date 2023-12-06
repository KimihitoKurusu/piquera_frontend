import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, InputNumber, InputNumberProps, Tooltip } from 'antd'
import styles from './CustomInputNumber.module.scss'

interface CustomInputNumberProps extends InputNumberProps {
  required?: boolean
  placeholder: string
  name: string,
  handleToggleClick?: () => void,
  toogleText?: string,
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: number) => void,
  min?: number,
  max?: number,
  children?: React.ReactNode
}

const CustomInputNumber: React.FC<CustomInputNumberProps> = (props) => {
  const {
    required = false,
    placeholder, name,
    handleToggleClick = null,
    toogleText = '',
    onChange = null,
    min = null,
    max = null,
    ...restProps
  } = props

  const tooltipButton = (
    <Tooltip title={toogleText} color={'blue'}>
      <Button
        type='primary'
        htmlType='submit'
        shape='circle'
        onClick={handleToggleClick}
        className='radius-100'
        icon={<PlusOutlined />}
      />
    </Tooltip>
  )

  const hasTooltip = () => handleToggleClick !== null

  const handleOnChange = (value: number) => {
    if (onChange !== null) {
      onChange(value)
    }
  }

  return (
    <>
      <Form.Item
        name={name}
        rules={[
          { required, message: 'Este campo es requerido' },
          {
            pattern: /^[0-9]*$/,
            message: 'Solo se permiten números enteros',
          },
        ]}
      >
        <InputNumber
          type={'number'}
          onChange={handleOnChange}
          placeholder={placeholder}
          min={min ? min : Number.MIN_SAFE_INTEGER}
          max={max? max: Number.MAX_SAFE_INTEGER}
          className={styles['custom-input-number']}
          size='large'
          addonAfter={hasTooltip() ? tooltipButton : null}
          {...restProps}
        />
      </Form.Item>
    </>
  )
}

export default CustomInputNumber
