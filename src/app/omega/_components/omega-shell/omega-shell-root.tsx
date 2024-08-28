import React from 'react'
import { OmegaShellProvider } from './omega-shell.context'
import { Box } from '@mantine/core'
import clsx from 'clsx';

import classes from './omega-shell.module.css'

interface OmegaShellRootProps {
  children: React.ReactNode
}
const OmegaShellRoot: React.FC<OmegaShellRootProps> = ({ children }) => {

  return (
    <Box
      component='main'
      className={clsx(classes.shellRoot, classes.shellGrid)}>
      <OmegaShellProvider>
        {children}
      </OmegaShellProvider>
    </Box>
  )
}

export default OmegaShellRoot