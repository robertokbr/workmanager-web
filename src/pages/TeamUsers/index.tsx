/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Container, Title, Users } from './styles';
import userAvatar from '../../assets/avatar.jpg';
import { useAuth } from '../../hooks/auth';
import Header from '../../components/Header';
import Loading from '../../components/Loading';

interface UserData {
  id: string;
  name: string;
  isManager: boolean;
}

const TeamUsers: React.FC = () => {
  const [users, setusers] = useState<UserData[] | void>();
  const { usersInTheTeam } = useAuth();
  useEffect(() => {
    (async () => {
      const myTeamUsers = await usersInTheTeam();
      setusers(myTeamUsers);
    })();
  }, [usersInTheTeam]);

  if (!users) {
    return <Loading />;
  }

  return (
    <>
      <Header>
        <Link to="/dashboard">
          <FiArrowLeft />
          Voltar
        </Link>
      </Header>
      <Container>
        <Title>Usuarios do seu time</Title>
        <Users>
          {users.map(userTeam => (
            <Link to={`/userTask/${userTeam.id}`} key={userTeam.id}>
              <img src={userAvatar} alt={userTeam.name} />
              <div>
                <strong>{userTeam.name}</strong>
                <p>{userTeam.isManager ? 'Gestor' : 'Usuário'}</p>
              </div>
              <FiChevronRight size={20} />
            </Link>
          ))}
        </Users>
      </Container>
    </>
  );
};

export default TeamUsers;
