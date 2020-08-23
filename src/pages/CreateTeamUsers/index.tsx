/* eslint-disable no-alert */
import React, { useState, useEffect, useCallback } from 'react';
import { FiChevronRight, FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { Container, Title, Users } from './styles';
import userAvatar from '../../assets/avatar.jpg';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import Header from '../../components/Header';
import Button from '../../components/Button';

interface UserData {
  id: string;
  name: string;
  isManager: boolean;
}

interface Response {
  members: UserData[];
}

const CreateTeamUsers: React.FC = () => {
  const [users, setusers] = useState<UserData[]>([]);
  const [selectedUsers, setSelectedusers] = useState<string[]>([]);
  const { user, token, usersInTheTeam } = useAuth();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const teamUsers = await usersInTheTeam();
      const allreadyInTheTeamUsers = teamUsers.map(
        responseUser => responseUser.id,
      );
      allreadyInTheTeamUsers.push(user.id);

      const response = await api.get<UserData[]>(`/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newUsers = response.data.filter(
        newUser => !allreadyInTheTeamUsers.includes(newUser.id),
      );
      setusers(newUsers);
    })();
  }, [token, user.id, usersInTheTeam]);

  const handleSelect = useCallback(
    (id: string) => {
      if (selectedUsers.includes(id)) {
        setSelectedusers(
          selectedUsers.filter(filteredUsers => filteredUsers !== id),
        );
        return;
      }
      setSelectedusers(state => [...state, id]);
    },
    [selectedUsers],
  );

  const handleSubmit = useCallback(async () => {
    try {
      await api.post(
        '/team',
        {
          manager_id: user.id,
          users_id: selectedUsers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      history.push('/dashboard');
    } catch (err) {
      alert('Tente novamente');
    }
  }, [token, user.id, history, selectedUsers]);

  return (
    <>
      <Header>
        <Link to="/dashboard">
          <FiArrowLeft />
          Voltar
        </Link>
      </Header>
      <Container>
        <Title>Selecione os usuarios</Title>
        <Users>
          {users.map(userTeam => (
            <button
              type="button"
              onClick={() => {
                handleSelect(userTeam.id);
              }}
              key={userTeam.id}
              className={selectedUsers.includes(userTeam.id) ? 'selected' : ''}
            >
              <img src={userAvatar} alt={userTeam.name} />
              <div>
                <strong>{userTeam.name}</strong>
                <p>{userTeam.isManager ? 'Gestor' : 'Usuário'}</p>
              </div>
              <FiChevronRight size={20} />
            </button>
          ))}

          <Button onClick={handleSubmit} className="submit" type="button">
            Confirmar
          </Button>
        </Users>
      </Container>
    </>
  );
};

export default CreateTeamUsers;
