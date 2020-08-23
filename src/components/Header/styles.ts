import styled from 'styled-components';

export const Container = styled.div`
  background: #1c1b29;
  padding: 30px 0;

  header {
    width: 1120px;
    margin: 0 auto;
    padding: 0 20px 150px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
      button,
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        text-decoration: none;
        font-size: 16px;
        transition: opacity 0.2s;
        background: none;
        border: none;
        font-weight: bold;
        &:hover {
          opacity: 0.6;
        }
        svg {
          margin-right: 10px;
        }
      }
    }
  }
`;
