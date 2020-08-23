import styled from 'styled-components';
import { shade } from 'polished';
import SignUpbackground from '../../assets/background.jpg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;

  option {
    font-size: 20px;
    color: #000;
  }
  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    h1 {
      margin-bottom: 24px;
    }
  }

  > a {
    color: #fff;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    transition: color 0.2s;
    font-weight: bold;
    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.5, '#fff')};
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  justify-content: center;
`;

export const Background = styled.div`
  flex: 1;
  background: url(${SignUpbackground}) no-repeat center;
  background-size: cover;
`;
