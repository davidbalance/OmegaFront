import { Box, Paper } from '@mantine/core'
import React from 'react'
import classes from './login.module.css'

interface LoginLayoutProps {
    children: React.ReactNode
}
const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {

    return (
        <Box className={classes.wrapper}>
            <Paper
                className={classes.container}
                radius='xs'
                p="md"
                withBorder>
                {children}
            </Paper>
        </Box>
    )
}

export default LoginLayout;