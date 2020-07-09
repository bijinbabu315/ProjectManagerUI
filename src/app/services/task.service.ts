import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../../environments/environment';
import { Task, ParentTask } from '../model/task';
import { TaskServiceURLS } from '../constants/service.constant';
import { map } from 'rxjs/operators';

const baseUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  /**
   * Creates an instance of task service.
   * @param http HttpClient
   */
  constructor(private http: HttpClient) { }

  /**
   * Adds update task
   * @param task Task
   */
  addOrUpdateTask(task: Task): Observable<any> {
    const addTaskUrl = baseUrl + TaskServiceURLS.SAVE_OR_UPDATE;
    return this.http.post<Task>(addTaskUrl, task);
  }

  /**
   * Gets all tasks
   * @returns all tasks
   */
  getAllTasks(): Observable<any>{
    const getAllTasksUrl = baseUrl + TaskServiceURLS.GET_ALL_TASKS;
    return this.http.get(getAllTasksUrl).pipe(
      map((resp: any) => this.getTaskData(resp))
    );
  }

  /**
   * Adds parent task
   * @param parentTask ParentTask
   * @returns parent task
   */
  addParentTask(parentTask: ParentTask): Observable<any> {
    const addParentTaskUrl = baseUrl + TaskServiceURLS.SAVE_UPDATE_PARENT_TASK;
    return this.http.post<ParentTask>(addParentTaskUrl, parentTask);
  }

  /**
   * Gets all parent tasks
   * @returns all parent tasks
   */
  getAllParentTasks(): Observable<any>{
    const getAllParentTasksUrl = baseUrl + TaskServiceURLS.GET_ALL_PARENT_TASKS;
    return this.http.get(getAllParentTasksUrl);
  }

  /**
   * Gets task data
   * @param response serviceResponse
   * @returns task data
   */
  getTaskData(response: any): any {
    const tasks: Task[] = [];

    response.forEach(taskElement => {
      if (!taskElement.parentTask){
        taskElement.parentTask = {
          id: '',
          parentTask: ''
        };
      }
      taskElement.project = taskElement.projectEntity;
      taskElement.user = taskElement.userData;
      tasks.push(taskElement);
    });
    return tasks;
  }
}
