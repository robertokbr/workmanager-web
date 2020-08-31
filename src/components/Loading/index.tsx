import React from 'react';
import { Container } from './styles';
import loadingGif from '../../assets/loading.gif';

const Loading: React.FC = () => {
  return (
    <Container>
      <img src={loadingGif} alt="Loading..." />
    </Container>
  );
};

export default Loading;
