import React from 'react'
import { Typography } from 'antd'
import type { TextProps } from 'antd/lib/typography/Text'
const { Text } = Typography

interface PropsType extends TextProps {
    label: string | React.ReactNode
}

const CustomText: React.FC<PropsType> = ({ label, ...props }) => {
    return <Text {...props}>{label}</Text>
}

export default CustomText
