import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, FloatFormContainer } from './styles';
import Input from '../Input';
import Button from '../Button';
import { useAuth } from '../../hooks/auth';
import getFormatedData from '../../utils/getFormatedData';
import { useData } from '../../hooks/useData';

interface TaskOperation {
  task?: TaskContent;
  operation: TaskOperations;
}

interface Props {
  taskFunction: TaskOperation;
  onEnd(): void;
}

const FloatForm: React.FC<Props> = ({ children, taskFunction, onEnd }) => {
  const { user } = useAuth();
  const { createTask, updateTask } = useData();

  const { task } = taskFunction;
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: CreateTaskDTO) => {
      await createTask(data);
      onEnd();
    },
    [createTask, onEnd],
  );

  const handleUpdate = useCallback(
    async (data: UpdateTaskDTO) => {
      if (taskFunction.operation === 'cancelTask' && !data.cancellationReason) {
        throw new Error('É necessário especificar o motivo');
      }

      await updateTask(data);
      onEnd();
    },
    [onEnd, taskFunction.operation, updateTask],
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
              <Button type="submit">Finalizar</Button>
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
              <Input name="reason" placeholder="Motivo (Obrigatório)" />
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
              <Button type="button" onClick={onEnd}>
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
