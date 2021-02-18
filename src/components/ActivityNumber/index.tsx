import React, { useState, useEffect } from 'react';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { Container, Wrapper, Number } from './styles';

interface ActivityNumberProps {
  userId: string;
}

interface TaskContent {
  id: string;
  name: string;
  status: TaskStatus;
  userId: string;
  started_at: Date;
  finished_at: Date;
  cancellationReason: string;
}

const ActivityNumber: React.FC<ActivityNumberProps> = ({ userId }) => {
  const { token } = useAuth();

  const [taskData, setTaskData] = useState({
    inProgress: 0,
    canceled: 0,
    finalized: 0,
  });

  useEffect(() => {
    (async () => {
      const { data } = await api.get<TaskContent[]>(`/task/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const finalized = data.filter(task => task.status === 'Finalizada')
        .length;
      const canceled = data.filter(task => task.status === 'Cancelada').length;
      const inProgress = data.filter(task => task.status === 'Andamento')
        .length;

      setTaskData({
        canceled,
        finalized,
        inProgress,
      });
    })();
  }, [token, userId]);

  return (
    <Container>
      <Wrapper state="Andamento">
        <Number>{taskData.inProgress}</Number>
      </Wrapper>
      <Wrapper state="Cancelada">
        <Number>{taskData.canceled}</Number>
      </Wrapper>
      <Wrapper state="Finalizada">
        <Number>{taskData.finalized}</Number>
      </Wrapper>
    </Container>
  );
};

export default ActivityNumber;
