import { Box, Title } from '@mantine/core'
import React from 'react'
import classes from './login.module.css'
import LoginForm from './_components/login-form'

const LoginPage: React.FC = () => {

    return (
        <Box>
            <Title
                className={classes.title}
                order={4}
                ta='center'
                mt='xl'
                mb='xl'>
                Bienvenido de vuelta a Omega!
            </Title>
            <LoginForm />
        </Box>
    )
}

export default LoginPage;