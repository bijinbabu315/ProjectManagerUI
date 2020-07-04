
/**
 * Project
 */
export interface Project {
    id: number;
    project: string;
    startDate: Date;
    endDate: Date;
    priority: number;
    user: any;
    noOfTasks?: number;
    noOfCompletedTask?: number;
}
