import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';
import { Container, FloatFormContainer } from './styles';
import Input from '../Input';
import api from '../../services/api';
import Button from '../Button';
import { useAuth } from '../../hooks/auth';
import getFormatedData from '../../utils/getFormatedData';

interface TaskData {
  name: string;
  date?: Date;
  time?: Date;
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

interface TaskOperation {
  task?: TaskContent;
  operation: 'addTask' | 'detailTask' | 'cancelTask' | 'finishTask';
}

interface Props {
  returnTask: (task: TaskContent) => void;
  taskFunction: TaskOperation;
}

const FloatForm: React.FC<Props> = ({ children, returnTask, taskFunction }) => {
  const { token, user } = useAuth();
  const { task } = taskFunction;
  const formRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback(
    async (data: TaskData) => {
      const formatedDate = new Date(`${data.date} ${data.time}`);
      try {
        await api
          .post(
            '/task',
            {
              taskName: data.name,
              started_at: formatedDate,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(response => returnTask(response.data));
      } catch (err) {
        alert('Dados invalidos');
      }
    },
    [token, returnTask],
  );

  const handleUpdate = useCallback(
    async data => {
      const formatedDate = new Date(`${data.date} ${data.time}`);

      try {
        if (taskFunction.operation === 'cancelTask' && !data.reason) {
          throw new Error('É necessário especificar o motivo');
        }
        await api
          .put(
            '/task',
            {
              task_id: task?.id,
              finished_at: formatedDate,
              cancellationReason: data.reason,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(response => returnTask(response.data));
      } catch (err) {
        alert(err);
      }
    },
    [token, returnTask, task, taskFunction.operation],
  );

  if (task) {
    return (
      <Container>
        {taskFunction.operation === 'finishTask' && (
          <FloatFormContainer>
            <div>
              <h2>Finalizar Tarefa - {task.name}</h2>
              <strong>
                Início: <span>{getFormatedData(task.started_at)}</span>
              </strong>
              <strong>Data da finalização:</strong>
              <span>
                <FiAlertCircle />
                Vazio para utilizar data e hora atual
              </span>
            </div>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input name="date" type="Date" />
              <Input name="time" type="Time" />
              <Button type="button" onClick={handleUpdate}>
                Finalizar
              </Button>
            </Form>
            {children}
          </FloatFormContainer>
        )}
        {taskFunction.operation === 'cancelTask' && (
          <FloatFormContainer>
            <div>
              <h2>Cancelar Tarefa - {task.name}</h2>
              <strong>
                Início: <span>{getFormatedData(task.started_at)}</span>
              </strong>
              <strong>Data da finalização:</strong>
              <span>
                <FiAlertCircle />
                Vazio para utilizar data e hora atual
              </span>
            </div>
            <Form ref={formRef} onSubmit={handleUpdate}>
              <Input name="date" type="Date" />
              <Input name="time" type="Time" />
              <Input name="reason" />
              <Button type="submit">Confirmar</Button>
            </Form>
            {children}
          </FloatFormContainer>
        )}
        {taskFunction.operation === 'detailTask' && (
          <FloatFormContainer>
            <div>
              <h2>
                {task.name} - {task.status}
              </h2>
              <strong>
                Início: <span>{getFormatedData(task.started_at)}</span>
              </strong>
              <strong>
                Término:
                <span>
                  {task.finished_at
                    ? getFormatedData(task.finished_at)
                    : 'Tarefa em andamento'}
                </span>
              </strong>
              {task.cancellationReason && (
                <strong>
                  Motivo: <span>{task.cancellationReason}</span>
                </strong>
              )}
            </div>
            {task.status === 'Andamento' && user.id === task.userId ? (
              <Button type="button" onClick={handleUpdate}>
                Finalizar
              </Button>
            ) : (
              ''
            )}

            {children}
          </FloatFormContainer>
        )}
      </Container>
    );
  }

  return (
    <Container>
      {taskFunction.operation === 'addTask' && (
        <FloatFormContainer>
          <h1>Nova tarefa</h1>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="name" placeholder="Nome da tarefa" />

            <span>
              <FiAlertCircle />
              Vazio para utilizar data e hora atual
            </span>

            <Input name="date" type="Date" />
            <Input name="time" type="Time" />
            <Button type="submit">Adicionar</Button>
          </Form>
          {children}
        </FloatFormContainer>
      )}
    </Container>
  );
};

export default FloatForm;
