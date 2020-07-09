/**
 * User
 */
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    employeeId: number;
    projectId: any;
    taskId: any;
    projectData?: any;
    isManager?: any;
    taskData?: any;
}
