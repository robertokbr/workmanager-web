import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #5541a2;
  height: 56px;
  border-radius: 5px;
  border: 0;
  padding: 0 16px;
  color: #fff;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;
  &:hover {
    background: ${shade(0.2, '#5541a2')};
  }
  div {
    margin-left: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;

    img {
      width: 30px;
      margin-top: 5px;
    }
  }
`;
