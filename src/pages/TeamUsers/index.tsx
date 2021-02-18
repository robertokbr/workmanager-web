import React from 'react';
import { FiChevronRight, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import * as S from './styles';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import CustomAvatar from '../../components/CustomAvatar';
import ActivityNumber from '../../components/ActivityNumber';
import { useData } from '../../hooks/useData';

const TeamUsers: React.FC = () => {
  const { usersInTheTeam } = useData();

  if (!usersInTheTeam) {
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
      <S.Container>
        <S.Title>Usuarios do seu time</S.Title>
        <S.UsersContainer>
          {usersInTheTeam.map(userTeam => (
            <S.LinkContainer
              to={`/userTask/${userTeam.id}`}
              key={Math.random()}
            >
              <CustomAvatar largeAvatar name={userTeam.name} />
              <S.UserDataContainer>
                <S.UserName>{userTeam.name}</S.UserName>
                <S.UserAccountState>
                  {userTeam.isManager ? 'Gestor' : 'Usuário'}
                </S.UserAccountState>
              </S.UserDataContainer>
              <ActivityNumber userId={userTeam.id} />
              <FiChevronRight size={20} />
            </S.LinkContainer>
          ))}
        </S.UsersContainer>
      </S.Container>
    </>
  );
};

export default TeamUsers;
