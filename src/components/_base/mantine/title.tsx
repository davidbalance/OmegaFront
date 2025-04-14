'use client'
import { Title as MantineTitle, TitleProps as MantineTitleProps } from '@mantine/core'
import React from 'react'

type TitleProps = React.ComponentProps<typeof MantineTitle>;
const Title: React.FC<TitleProps> = ({ ...props }) => {
    return (
        <MantineTitle {...props} />
    )
}

export default Title