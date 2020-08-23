import styled from 'styled-components';

interface FormProps {
  formIsVisible: number;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;

export const ButtonContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  margin-top: -150px;
`;

export const ButtonDashboard = styled.div`
  background: #333333;
  border-radius: 5px;
  padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    margin-left: 8px;
  }
  h1 {
    font-size: 32px;
    margin-right: 10px;
  }
  a,
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    text-decoration: none;
    background: none;
    outline: 0;
    border: none;

    @media (max-width: 967px) {
      flex-direction: column;
    }
  }
`;

export const TableContainer = styled.section<FormProps>`
  margin-top: 64px;

  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: #fff;
      font-weight: bold;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }
    tbody {
      tr {
        cursor: pointer;
      }
      td {
        padding: 20px 32px;
        border: 0;
        background: #333333;
        font-size: 16px;
        font-weight: bold;
        color: #fff;

        &.Finalizada {
          color: #12a454;
        }
        &.Cancelada {
          color: #e83f5b;
        }

        button {
          color: #fff;
          transition: transform 0.2s;
          background: inherit;
          border: none;

          &:hover {
            transform: scale(1.2);
          }
        }
      }

      td.first {
        border-radius: 8px 0 0 8px;
      }

      td#last {
        border-radius: 0 8px 8px 0;
      }
    }
  }
`;
