
/**
 * Project
 */
export interface Project {
    id: number;
    project: string;
    startDate: Date;
    endDate: Date;
    priority: number;
    user?: any;
    userId?: any;
    noOfTasks?: number;
    noOfCompletedTask?: number;
}
