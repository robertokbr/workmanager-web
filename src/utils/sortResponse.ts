interface TaskContent {
  id: string;
  name: string;
  status: 'Cancelada' | 'Andamento' | 'Finalizada';
  userId: string;
  started_at: Date;
  finished_at: Date;
  cancellationReason: string;
}
export default function sortResponse(data: TaskContent[]): TaskContent[] {
  const currentTask = data.filter(
    (task: TaskContent) => task.status === 'Andamento',
  );
  const finishedTask = data.filter(
    (task: TaskContent) => task.status === 'Finalizada',
  );
  const canceledTask = data.filter(
    (task: TaskContent) => task.status === 'Cancelada',
  );

  return [...currentTask, ...finishedTask, ...canceledTask];
}
