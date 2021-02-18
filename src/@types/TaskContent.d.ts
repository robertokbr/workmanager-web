declare type TaskContent = {
  id: string;
  name: string;
  status: TaskStatus;
  userId: string;
  started_at: Date;
  finished_at: Date;
  cancellationReason: string;
};
