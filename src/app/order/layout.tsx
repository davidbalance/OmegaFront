import Footer from '@/components/footer/Footer'
import { Box } from '@mantine/core'
import classes from './layout.module.css'
import React from 'react'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <main className={classes.wrapper}>
            <Box className={classes.outer} mah='100%' pos='relative'>
                <Box h='100%' w='100%'>
                    {children}
                </Box>
            </Box>
            <Footer />
        </main>
    )
}

export default Layout