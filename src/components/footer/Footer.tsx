import React from 'react'
import classes from './Footer.module.css'
import { Image } from '@mantine/core'

const Footer: React.FC = () => {
    return (
        <div className={classes.wrapper}>
            <Image className={classes.img} src="/assets/images/balance.png" alt='nav logo' />
        </div>
    )
}

export default Footer