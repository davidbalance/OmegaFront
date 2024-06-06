'use client'

import React from 'react';
import { Text, useMantineTheme } from '@mantine/core';
import { ModularBox } from '@/components/modular-box/ModularBox';
import classes from './page.module.css';

const Landing: React.FC = () => {
  const theme = useMantineTheme();

  return (
    <ModularBox h='100%' align='center' justify='center'>
      <h1 className={classes.title}>
        <Text
          fw='bolder'
          component="span"
          variant="gradient"
          gradient={{ from: theme.colors["omegaColors"][3], to: theme.colors["omegaColors"][6] }}
          inherit>
          OMEGA
        </Text>{' '}
        Sistema de reporteria medica
      </h1>

      <Text className={classes.description} c="dimmed" size='sm' mt='md'>
        Sistema enfocado en la gestion de reportes
        <br />- Acceso a los archivos almacenados en nuestros servidores.
        <br />- Elaboracion de reportes.
      </Text>
    </ModularBox>
  )
}

export default Landing