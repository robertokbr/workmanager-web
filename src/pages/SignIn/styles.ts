import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import SignInBackground from '../../assets/background.jpg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

const appearFromLeft = keyframes`
from{
opacity: 0;
transform: translatex(-50px);

}
to{
opacity: 1;
transform: translatex(0);

}
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;

  animation: ${appearFromLeft} 1s;
  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 20px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
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
  background: url(${SignInBackground}) no-repeat center;
  background-size: cover;
`;
