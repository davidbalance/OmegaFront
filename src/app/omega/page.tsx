import React from 'react';
import classes from './page.module.css';
import { Container, Text } from '@mantine/core';

const Landing: React.FC = () => {
  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          <Text component="span" variant="gradient" gradient={{ from: 'orangered', to: 'coral' }} inherit>
            OMEGA
          </Text>{' '}
          Sistema de reporteria medica
        </h1>

        <Text className={classes.description} c="dimmed" size='md'>
          Sistema enfocado en la gestion de reportes
          <br />– Acceso a los archivos almacenados en nuestros servidores.
          <br />– Elaboracion de reportes.
        </Text>
      </Container>
    </div>
  )
}

export default Landing