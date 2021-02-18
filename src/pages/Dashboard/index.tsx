import React, { useState } from 'react';
import { IoMdArchive } from 'react-icons/io';
import { Link } from 'react-router-dom';
import * as Icons from 'react-icons/fi';

import * as S from './styles';
import { useAuth } from '../../hooks/auth';
import Header from '../../components/Header';
import FloatForm from '../../components/FloatForm';
import getFormatedData from '../../utils/getFormatedData';
import Loading from '../../components/Loading';
import { useData } from '../../hooks/useData';

interface TaskOperation {
  task?: TaskContent;
  operation: TaskOperations;
}

const Dashboard: React.FC = () => {
  const [taskFunction, setTaskFunction] = useState<TaskOperation | void>();
  const { signOut, user } = useAuth();
  const { userTasks } = useData();

  if (!userTasks) {
    return <Loading />;
  }

  return (
    <>
      {taskFunction && (
        <FloatForm taskFunction={taskFunction} onEnd={() => setTaskFunction()}>
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
          <Icons.FiArrowLeft />
          Logout
        </button>
      </Header>
      <S.Container>
        <S.ButtonContainer isManager={Number(user.isManager)}>
          <S.ButtonDashboard>
            {user.isManager ? (
              <Link to="/createTeam">
                <h1 data-testid="balance-income">Adicionar</h1>
                <Icons.FiUserPlus size={30} />
              </Link>
            ) : (
              <h1>
                Andamento:
                <span>
                  {userTasks.filter(task => task.status === 'Andamento').length}
                </span>
              </h1>
            )}
          </S.ButtonDashboard>
          {user.isManager && (
            <S.ButtonDashboard>
              <Link to="/teamUsers">
                <h1 data-testid="balance-outcome">Visualizar time</h1>
                <Icons.FiUsers size={30} />
              </Link>
            </S.ButtonDashboard>
          )}
          <S.ButtonDashboard>
            <button
              type="button"
              onClick={() => {
                setTaskFunction({ operation: 'addTask' });
              }}
            >
              <h1 data-testid="balance-total">Criar tarefa</h1>
              <Icons.FiCalendar size={30} />
            </button>
          </S.ButtonDashboard>
        </S.ButtonContainer>
        <S.TableContainer formIsVisible={Number(!!taskFunction)}>
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
              {userTasks.map(task => (
                <tr key={task.id}>
                  <td className="first">{task.name}</td>
                  <td>{getFormatedData(task.started_at)}</td>
                  <td>{getFormatedData(task.finished_at)}</td>
                  <td className={task.status}>{task.status}</td>
                  <td id="last">
                    {task.status === 'Andamento' ? (
                      <div>
                        <button
                          className="Cancelada"
                          type="button"
                          onClick={() => {
                            setTaskFunction({ task, operation: 'cancelTask' });
                          }}
                        >
                          <Icons.FiXCircle size={25} />
                        </button>

                        <button
                          className="Finalizada"
                          type="button"
                          onClick={() => {
                            setTaskFunction({ task, operation: 'finishTask' });
                          }}
                        >
                          <Icons.FiCheckCircle size={25} />
                        </button>
                      </div>
                    ) : (
                      <button
                        className={task.status}
                        type="button"
                        onClick={() => {
                          setTaskFunction({ task, operation: 'detailTask' });
                        }}
                      >
                        <IoMdArchive size={25} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </S.TableContainer>
      </S.Container>
    </>
  );
};

export default Dashboard;
