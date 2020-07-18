/**
 * User
 */
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    employeeId: number;
    projectId: number;
    taskId: number;
    isManager?: any;
}
