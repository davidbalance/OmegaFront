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
          Repository system
        </h1>

        <Text className={classes.description} c="dimmed">
          System focused in the report management <br />– Includes an access to files stored in our servers
        </Text>
      </Container>
    </div>
  )
}

export default Landing