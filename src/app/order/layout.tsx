import Footer from '@/components/footer/Footer'
import { Box } from '@mantine/core'
import classes from './layout.module.css'
import React from 'react'
import ModularLayout from '@/components/modular/layout/ModularLayout'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Box component='main' className={classes.wrapper}>
            <ModularLayout>
                {children}
            </ModularLayout>
        </Box>
    )
}

export default Layout