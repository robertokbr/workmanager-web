import React, { useState, useCallback, useEffect } from 'react';
import { FiChevronRight, FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { Container, Title, Users } from './styles';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import CustomAvatar from '../../components/CustomAvatar';
import { useData } from '../../hooks/useData';

interface UserData {
  id: string;
  name: string;
  isManager: boolean;
}

const CreateTeamUsers: React.FC = () => {
  const {
    noTeamUsers,
    handleAddUsersInTheTeam,
    getUsersWithoutTeam,
  } = useData();

  const [selectedUsers, setSelectedusers] = useState<UserData[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await getUsersWithoutTeam();

      setLoading(false);
    })();
  }, [getUsersWithoutTeam]);

  const history = useHistory();

  const handleSelect = useCallback(
    (selectedUser: UserData) => {
      if (selectedUsers.includes(selectedUser)) {
        setSelectedusers(
          selectedUsers.filter(
            filteredUsers => filteredUsers.id !== selectedUser.id,
          ),
        );
        return;
      }

      setSelectedusers(state => [...state, selectedUser]);
    },
    [selectedUsers],
  );

  const handleSubmit = useCallback(async () => {
    await handleAddUsersInTheTeam(selectedUsers);

    history.push('dashboard');
  }, [handleAddUsersInTheTeam, history, selectedUsers]);

  if (loading) {
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
        <Title>Selecione os usuarios</Title>
        <Users>
          <Button onClick={handleSubmit} className="submit" type="button">
            Confirmar
          </Button>
          {noTeamUsers.map(noTeamUser => (
            <button
              type="button"
              onClick={() => {
                handleSelect(noTeamUser);
              }}
              key={noTeamUser.id}
              className={selectedUsers.includes(noTeamUser) ? 'selected' : ''}
            >
              <CustomAvatar largeAvatar name={noTeamUser.name} />
              <div>
                <strong>{noTeamUser.name}</strong>
                <p>{noTeamUser.isManager ? 'Gestor' : 'Usuário'}</p>
              </div>
              <FiChevronRight size={20} />
            </button>
          ))}
        </Users>
      </Container>
    </>
  );
};

export default CreateTeamUsers;
