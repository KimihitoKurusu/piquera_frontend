import React from 'react'
import { Typography } from 'antd'
import type { BaseType } from 'antd/lib/typography/Base'
import type { TitleProps } from 'antd/lib/typography/Title'
const { Title } = Typography

interface CustomTitleProps extends TitleProps {
    label: string | React.ReactNode
    type?: BaseType
    level?: 1 | 2 | 3 | 4 | 5
}

const CustomTitle: React.FC<CustomTitleProps> = (props) => {
    const { label, type = 'secondary', level = 5, ...restProps } = props
    return <Title type={type} level={level} {...restProps}>{label}</Title>
}

export default CustomTitle
