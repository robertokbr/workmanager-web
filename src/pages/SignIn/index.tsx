/* eslint-disable no-unused-expressions */
import React, { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiUser, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container, Background, Content, FormContainer } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';

interface SignFormData {
  name: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: SignFormData) => {
      try {
        await signIn({
          name: data.name,
          password: data.password,
        });
      } catch (err) {
        alert('Dados invalidos');
      }
    },
    [signIn],
  );

  return (
    <Container>
      <Content>
        <FormContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu LogIn</h1>
            <Input icon={FiUser} name="name" placeholder="Name" />
            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Entrar</Button>
          </Form>
          <Link to="/signup">
            <FiLogIn />
            Criar Conta
          </Link>
        </FormContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
