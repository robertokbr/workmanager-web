import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #333333;
  border-radius: 5px;
  border: 2px solid #222222;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  color: #666360;

  & + div {
    margin-top: 1rem;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #1985a1;
      border-color: #1985a1;
    `}
  ${props =>
    props.isFilled &&
    css`
      color: #1985a1;
    `}



  select {
    flex: 1;
    background: transparent;
    border: 0;
    color: #666360;
  }
  svg {
    margin-right: 16px;
  }
`;
