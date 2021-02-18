import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiLock, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container, Background, Content, AnimationContainer } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import api from '../../services/api';
import Select from '../../components/select';

interface SignUpFormData {
  name: string;
  password: string;
  isManager: boolean;
}

const SignUp: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async ({ isManager, name, password }: SignUpFormData) => {
      try {
        if (name === '') {
          throw new Error('O nome é obrigatório');
        }
        await api.post('/user', {
          name,
          password,
          isManager,
        });

        history.push('/');
      } catch (err) {
        alert('O nome de Usuario ja esta em uso ');
      }
    },
    [history],
  );

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu Cadastro</h1>
            <Input icon={FiUser} name="name" placeholder="Nome" />
            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Senha"
            />
            <Select icon={FiUser} name="isManager">
              <option value={0}>Usuário</option>
              <option value={1}>Gestor</option>
            </Select>
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para Logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
