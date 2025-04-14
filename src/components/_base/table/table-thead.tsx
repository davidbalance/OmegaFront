'use client'

import React from 'react'
import clsx from 'clsx'
import { TableThead as MantineThead } from '@mantine/core'
import { useTable } from './table.context';

import classes from './table.module.css';

interface TableTHeadProps {
  children: React.ReactNode
}
const TableTHead: React.FC<TableTHeadProps> = ({ children }) => {

  const { isScrolled } = useTable();

  return (
    <MantineThead
      className={clsx(classes.sticky,
        classes.thead, {
        [classes.scrolled]: isScrolled
      })}>
      {children}
    </MantineThead>
  )
}

export default TableTHead