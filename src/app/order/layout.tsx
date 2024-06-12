import Footer from '@/components/footer/Footer'
import { Box } from '@mantine/core'
import classes from './layout.module.css'
import React from 'react'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <main className={classes.wrapper}>
            <Box h='100%' w='100%'>
                {children}
            </Box>
            <Footer />
        </main>
    )
}

export default Layout