'use client'

import Navbar from "@/components/navbar/Navbar"
import styles from './layout.module.css'
import { Paper } from "@mantine/core"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    return (
        <main className={styles.wrapper}>
            <Navbar />
            <div className={styles.outer}>
                <Paper className={styles.inner} shadow="xs" p="lg" radius={"lg"}>
                    {children}
                </Paper>
            </div>
        </main>
    )
}

export default Layout