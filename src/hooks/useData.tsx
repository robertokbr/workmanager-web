/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react';
import api from '../services/api';
import { useAuth } from './auth';

interface User {
  id: string;
  name: string;
  isManager: boolean;
}

interface Team {
  members: User[];
}

interface IDataContext {
  userTasks: TaskContent[];
  usersInTheTeam: User[];
  noTeamUsers: User[];
  getUsersWithoutTeam(): Promise<void>;
  createTask(data: CreateTaskDTO): Promise<void>;
  updateTask(data: UpdateTaskDTO): Promise<void>;
  handleAddUsersInTheTeam(users: User[]): Promise<void>;
  handleClearState(): void;
}

export const DataContext = createContext<IDataContext>({} as IDataContext);

export const DataProvider: React.FC = ({ children }) => {
  const [usersInTheTeam, setUsersInTheTeam] = useState<User[]>([]);
  const [noTeamUsers, setNoTeamUsers] = useState<User[]>([]);
  const [userTasks, setUserTasks] = useState<TaskContent[]>([]);

  const { user, token, signOut } = useAuth();

  const credentials = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    [token],
  );

  const handleClearState = useCallback(() => {
    setUsersInTheTeam([]);
    setNoTeamUsers([]);
    setUserTasks([]);
  }, []);

  const getUsersWithoutTeam = useCallback(async () => {
    const { data: allUsers } = await api.get<User[]>(`/user`, credentials);

    const userTeamIDs = [user.id, ...usersInTheTeam.map(member => member.id)];
    const usersWithoutTeam = allUsers.filter(
      eachUser => !userTeamIDs.includes(eachUser.id),
    );

    setNoTeamUsers(usersWithoutTeam);
  }, [credentials, user, usersInTheTeam]);

  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const { data: tasks } = await api.get<TaskContent[]>(
          `/task/${user.id}`,
          credentials,
        );

        setUserTasks(tasks);
      } catch (err) {
        handleClearState();
        signOut();
      }
    })();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    (async () => {
      const { data: team } = await api.get<Team>(
        `/team/${user.id}`,
        credentials,
      );

      setUsersInTheTeam(team.members);
      await getUsersWithoutTeam();
    })();
  }, [user]);

  const handleAddUsersInTheTeam = useCallback(
    async (users: User[]) => {
      await api.post<User[]>(
        '/team',
        { manager_id: user.id, users_id: users.map(eachUser => eachUser.id) },
        credentials,
      );

      setUsersInTheTeam(state => [...state, ...users]);
    },
    [credentials, user],
  );

  const createTask = useCallback(
    async ({ name, date, time }: CreateTaskDTO) => {
      const started_at = new Date(`${date} ${time}`);

      const { data: task } = await api.post(
        '/task',
        { taskName: name, started_at },
        credentials,
      );

      setUserTasks(state => [...state, task]);
    },
    [credentials],
  );

  const updateTask = useCallback(
    async ({ cancellationReason, date, time, task_id }: UpdateTaskDTO) => {
      const finished_at = new Date(`${date} ${time}`);
      const tasks = userTasks;
      const taskIndex = tasks.findIndex(task => task.id === task_id);

      const { data: task } = await api.put(
        '/task',
        {
          task_id,
          finished_at,
          cancellationReason,
        },
        credentials,
      );

      const updatedTasks = tasks.splice(taskIndex, 1, task);

      setUserTasks(updatedTasks);
    },
    [credentials, userTasks],
  );

  return (
    <DataContext.Provider
      value={{
        handleClearState,
        getUsersWithoutTeam,
        updateTask,
        createTask,
        userTasks,
        noTeamUsers,
        usersInTheTeam,
        handleAddUsersInTheTeam,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export function useData(): IDataContext {
  const context = useContext(DataContext);
  return context;
}

export default DataContext;
