import styled from 'styled-components';

interface ActivityNumberProps {
  state: TaskStatus;
}

const statusColor = {
  Cancelada: '#e83f5b',
  Andamento: '#1c1b29',
  Finalizada: '#12a454',
};

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  height: 30px;
  width: 100%;
`;

export const Wrapper = styled.div<ActivityNumberProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  background: ${props => statusColor[props.state]};
  margin-right: 8px;
`;

export const Number = styled.p`
  font-size: 12px;
  color: #fff;
`;
