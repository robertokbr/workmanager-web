import React from 'react';

import { Container } from './styles';

const Header: React.FC = ({ children }) => {
  return (
    <Container>
      <header>
        <nav>{children}</nav>
      </header>
    </Container>
  );
};

export default Header;
