/**
 * Task
 */
export interface Task {
  id: number;
  task: string;
  parent?: boolean;
  parentTask: any;
  project?: any;
  projectEntity?: any;
  startDate: Date;
  endDate: Date;
  priority: number;
  status: any;
  user?: any;
}

/**
 * Parent task
 */
export interface ParentTask{
  id: number;
  parentTask: string;
}
