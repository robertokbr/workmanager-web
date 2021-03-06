import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useRouteMatch } from 'react-router-dom';
import useSWR from 'swr';

import api from '../../services/api';
import Header from '../../components/Header';
import {
  Container,
  ButtonContainer,
  ButtonDashboard,
  TableContainer,
} from './styles';
import { useAuth } from '../../hooks/auth';
import FloatForm from '../../components/FloatForm';
import getFormatedData from '../../utils/getFormatedData';
import Loading from '../../components/Loading';

interface RouteParams {
  id: string;
}

interface TaskOperation {
  task?: TaskContent;
  operation: TaskOperations;
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
const TeamUserTask: React.FC = () => {
  const [allTask, setAllTask] = useState<TaskContent[] | void>();
  const [taskFunction, setTaskFunction] = useState<TaskOperation | void>();
  const { token } = useAuth();

  const { params } = useRouteMatch<RouteParams>();

  useSWR(`/task/${params.id}`, (url: string) =>
    api
      .get<TaskContent[]>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(resp => setAllTask(resp.data)),
  );

  if (!allTask) {
    return <Loading />;
  }

  return (
    <>
      <Header>
        <Link to="/teamUsers">
          <FiArrowLeft />
          Voltar
        </Link>
      </Header>
      {taskFunction && (
        <FloatForm onEnd={() => {}} taskFunction={taskFunction}>
          <button
            className="cancel"
            onClick={() => {
              setTaskFunction();
            }}
            type="button"
          >
            Fechar
          </button>
        </FloatForm>
      )}

      <Container>
        <ButtonContainer>
          <ButtonDashboard className="Finalizada">
            <h1>
              Finalizadas:
              <span>
                {allTask.filter(task => task.status === 'Finalizada').length}
              </span>
            </h1>
          </ButtonDashboard>
          <ButtonDashboard className="Cancelada">
            <h1>
              Canceladas:
              <span>
                {allTask.filter(task => task.status === 'Cancelada').length}
              </span>
            </h1>
          </ButtonDashboard>
          <ButtonDashboard>
            <h1>
              Andamento:
              <span>
                {allTask.filter(task => task.status === 'Andamento').length}
              </span>
            </h1>
          </ButtonDashboard>
        </ButtonContainer>

        <TableContainer formIsVisible={Number(!!taskFunction)}>
          <table>
            <thead>
              <tr>
                <th>Tárefa</th>
                <th>Ínicio</th>
                <th>Término</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {allTask.map(task => (
                <tr
                  key={task.id}
                  onClick={() => {
                    setTaskFunction({ operation: 'detailTask', task });
                  }}
                >
                  <td className="first">{task.name}</td>
                  <td>{getFormatedData(task.started_at)}</td>
                  <td>{getFormatedData(task.finished_at)}</td>
                  <td id="last" className={task.status}>
                    {task.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default TeamUserTask;
