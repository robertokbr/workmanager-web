import styled from 'styled-components';
import { motion } from 'framer-motion';
import { shade } from 'polished';

export const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
`;

export const FloatFormContainer = styled.div`
  padding: 2rem 5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #282a36;
  color: #fff;
  border-radius: 5px;

  h1,
  h2 {
    margin-bottom: 2rem;
  }
  span {
    font-weight: 400;
    opacity: 0.7;
    font-size: 14px;
    margin: 1rem 0;
    display: block;
    svg {
      margin-right: 0.5rem;
    }
  }
  strong {
    display: flex;
    > span {
      margin-left: 0.5rem;
      margin-top: 0;
      display: flex;
    }
  }

  button {
    width: 300px;
  }
  .cancel {
    background: none;
    border: none;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
    font-weight: bold;
    margin-top: 2rem;

    &:hover {
      color: ${shade(0.5, '#fff')};
    }
  }
`;
