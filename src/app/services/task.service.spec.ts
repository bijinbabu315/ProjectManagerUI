import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { TaskServiceURLS } from '../constants/service.constant';
import { environment } from 'src/environments/environment';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.apiUrl;

  const taskList = [
    {
      id: 1,
      parentTask: {
        id: 1,
        parentTask: 'test parent task'
      },
      project: {
        id: 1,
        project: 'Test Project ',
        startDate: new Date(),
        endDate: new Date(),
        priority: 10,
        user: {
          id: 1,
          firstName: 'biji',
          lastName: 'biji',
          employeeId: '1234',
          task: null
        }
      },
      task: 'test task',
      startDate: new Date(),
      endDate: new Date(),
      priority: 20,
      status: 0
    }
  ];

  const parentTaskList = [
   {
     id: 1,
     parentTask: 'test parent task'
   }
 ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of tasks', () => {

    let response;
    spyOn(service, 'getAllTasks').and.returnValue(of(taskList));

    service.getAllTasks().subscribe(res => {
      response = res;
    });
    expect(response).toEqual(taskList);
  });

  it('should call addOrUpdateTask', () => {


    service.addOrUpdateTask(taskList[0]).subscribe(resp => {
      expect(resp).toBe(taskList[0]);
    });
    const req = httpMock.expectOne(baseUrl + TaskServiceURLS.SAVE_OR_UPDATE);
    expect(req.request.method).toBe('POST');
    req.flush(taskList[0]);
  });


  it('should call addParentTask', () => {

    service.addParentTask(parentTaskList[0]).subscribe(resp => {
      expect(resp).toBe(parentTaskList[0]);
    });
    const req = httpMock.expectOne(baseUrl + TaskServiceURLS.SAVE_UPDATE_PARENT_TASK);
    expect(req.request.method).toBe('POST');
    req.flush(parentTaskList[0]);
  });


  it('should return a list of parent tasks', () => {

    let response;
    spyOn(service, 'getAllParentTasks').and.returnValue(of(parentTaskList));

    service.getAllParentTasks().subscribe(res => {
      response = res;
    });
    expect(response).toEqual(parentTaskList);
  });
});
