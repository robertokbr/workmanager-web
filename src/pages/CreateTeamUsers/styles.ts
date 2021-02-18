import styled from 'styled-components';
import { shade } from 'polished';

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

  button {
    background: #333333;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    display: flex;
    align-items: center;
    transition: transform 0.2s;
    border: 2px solid transparent;

    &:hover {
      transform: scale(1.02);
    }

    & + button {
      margin-top: 16px;
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    > div {
      flex: 1;
      margin: 0 16px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

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
      color: #fff;
    }

    &.selected {
      border-color: #12a454;
    }

    &.submit {
      background: #5541a2;
      display: flex;
      justify-content: center;
      transition: 0.2s;
      &:hover {
        background: ${shade(0.2, '#5541a2')};
        transform: scale(1);
      }
    }
  }
`;
