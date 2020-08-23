import styled from 'styled-components';

interface formProps {
  hasError: boolean;
}

export const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  position: absolute;
  top: 15%;
  font-size: 64px;
  color: #fff;
`;

export const Users = styled.div`
  margin-top: 80px;
  max-width: 700px;

  a {
    background: #333333;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.1);
    }

    & + a {
      margin-top: 16px;
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }
    div {
      flex: 1;
      margin: 0 16px;

      strong {
        font-size: 20px;
        color: #fff;
      }
      p {
        font-size: 18px;
        color: #fff;
        margin-top: 4px;
      }
    }
    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;
