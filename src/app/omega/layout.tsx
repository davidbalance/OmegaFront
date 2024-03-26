'use client'

import Navbar from "@/components/navbar/Navbar"
import styles from './layout.module.css'
import { Paper } from "@mantine/core"
import { useConfiguration } from "@/hooks"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { routes } = useConfiguration();

    return (
        <main className={styles.wrapper}>
            <Navbar links={routes} />
            <div className={styles.outer}>
                <Paper className={styles.inner} shadow="xs" p="lg" radius={"lg"}>
                    {children}
                </Paper>
            </div>
        </main>
    )
}

export default Layout