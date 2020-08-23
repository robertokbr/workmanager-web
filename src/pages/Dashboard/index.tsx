import React, { useState, useEffect, useCallback } from 'react';
import {
  FiUserPlus,
  FiUsers,
  FiCalendar,
  FiXCircle,
  FiCheckCircle,
  FiArrowLeft,
  FiArchive,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
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
import sortResponse from '../../utils/sortResponse';
import getFormatedData from '../../utils/getFormatedData';

interface TaskOperation {
  task?: TaskContent;
  operation: 'addTask' | 'detailTask' | 'cancelTask' | 'finishTask';
}

interface TaskContent {
  id: string;
  name: string;
  status: 'Cancelada' | 'Andamento' | 'Finalizada';
  userId: string;
  started_at: Date;
  finished_at: Date;
  cancellationReason: string;
}

const Dashboard: React.FC = () => {
  const [allTask, setAllTask] = useState<TaskContent[]>([]);
  const [taskFunction, setTaskFunction] = useState<TaskOperation | void>();
  const { user, token, signOut } = useAuth();

  useEffect(() => {
    api
      .get(`/task/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        const tasks = sortResponse(response.data);
        setAllTask(tasks);
      });
  }, [user.id, token]);

  const handleAddTask = useCallback(
    (value: TaskContent) => {
      if (taskFunction && taskFunction.operation === 'addTask') {
        setAllTask(state => [...state, value]);
        setTaskFunction();
        return;
      }
      const filteredTasks = allTask.filter(task => task.id !== value.id);
      setAllTask([...filteredTasks, value]);
      setTaskFunction();
    },
    [taskFunction, allTask],
  );

  return (
    <>
      {taskFunction && (
        <FloatForm
          taskFunction={taskFunction}
          returnTask={value => {
            handleAddTask(value);
          }}
        >
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

      <Header>
        <button type="button" onClick={signOut}>
          <FiArrowLeft />
          Logout
        </button>
      </Header>
      <Container>
        <ButtonContainer isManager={Number(user.isManager)}>
          <ButtonDashboard>
            {user.isManager ? (
              <Link to="/createTeam">
                <h1 data-testid="balance-income">Adicionar</h1>
                <FiUserPlus size={30} />
              </Link>
            ) : (
              <h1>
                Andamento:
                <span>
                  {allTask.filter(task => task.status === 'Andamento').length}
                </span>
              </h1>
            )}
          </ButtonDashboard>
          {user.isManager && (
            <ButtonDashboard>
              <Link to="/teamUsers">
                <h1 data-testid="balance-outcome">Visualizar time</h1>
                <FiUsers size={30} />
              </Link>
            </ButtonDashboard>
          )}
          <ButtonDashboard>
            <button
              type="button"
              onClick={() => {
                setTaskFunction({ operation: 'addTask' });
              }}
            >
              <h1 data-testid="balance-total">Criar tarefa</h1>
              <FiCalendar size={30} />
            </button>
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
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {allTask.map(task => (
                <tr key={task.id}>
                  <td className="first">{task.name}</td>
                  <td>{getFormatedData(task.started_at)}</td>
                  <td>{getFormatedData(task.finished_at)}</td>
                  <td className={task.status}>{task.status}</td>

                  <td id="last">
                    {task.status === 'Andamento' && (
                      <>
                        <button
                          className="cancel"
                          type="button"
                          onClick={() => {
                            setTaskFunction({ task, operation: 'cancelTask' });
                          }}
                        >
                          <FiXCircle size={25} />
                        </button>

                        <button
                          className="finish"
                          type="button"
                          onClick={() => {
                            setTaskFunction({ task, operation: 'finishTask' });
                          }}
                        >
                          <FiCheckCircle size={25} />
                        </button>
                      </>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setTaskFunction({ task, operation: 'detailTask' });
                      }}
                    >
                      <FiArchive size={25} />
                    </button>
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

export default Dashboard;
