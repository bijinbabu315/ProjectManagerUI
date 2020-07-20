import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ListFilter } from 'src/app/list-filter.pipe';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let taskService: TaskService;
  let userService: UserService;
  let projectService: ProjectService;
  let router: Router;
  const formBuilder: FormBuilder = new FormBuilder();
//   const mockRouter: any = jasmine.createSpyObj(['navigate']);
  const parentTaskList = [
    {
        id: 1,
        parentTask: 'Add validations for form fields'
    }
];
  const taskList = [
    {
        id: 1,
        task: 'add validtaion for DOB',
        startDate: new Date(),
        endDate: new Date(),
        priority: 5,
        status: 1,
        userData: {
            id: 1,
            firstName: 'Biji',
            lastName: 'Babu',
            employeeId: 608877,
            isManager: null
        },
        parentTask: {
            id: 1,
            parentTask: 'Add validations for form fields'
        },
        projectEntity: {
            id: 1,
            project: 'Project Data',
            startDate: new Date(),
            endDate: new Date(),
            priority: 8
        }
    },

    {
      id: 2,
      task: 'add greeting intent',
      startDate: new Date(),
      endDate: new Date(),
      priority: 7,
      status: 1,
      userData: {
          id: 2,
          firstName: 'Diya',
          lastName: 'Sobin',
          employeeId: 589632,
          isManager: null
      },
      parentTask: {
          id: 1,
          parentTask: 'Add intents for chatbot'
      },
      projectEntity: {
          id: 2,
          project: 'Chat bot',
          startDate: new Date(),
          endDate: new Date(),
          priority: 10
      }
  }
];

  const projectList = [{
    id: 2,
    project: 'Test project',
    startDate: new Date(),
    endDate: new Date(),
    priority: 22,
    user: [
      {
        id: 3,
        firstName: 'Anu',
        lastName: 'John',
        employeeId: 68253,
        isManager: 1
      }
    ],
  },
  {
    id: 1,
    project: 'Test project B',
    startDate: new Date(),
    endDate: new Date(),
    priority: 22,
    user: [
      {
        id: 1,
        firstName: 'Diya',
        lastName: 'Sobin',
        employeeId: 89635,
        isManager: 1
      }
    ]
  }
  ];


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [ AddTaskComponent, ListFilter ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [TaskService, UserService, ProjectService,
         { provide: FormBuilder, useValue: formBuilder }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    projectService = TestBed.inject(ProjectService);
    taskService = TestBed.inject(TaskService);
    // router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return form as false', () => {
    const controlsInForm = component.formControls;
    controlsInForm.project.setValue('');
    component.taskForm.controls.task.setValue(null);
    component.taskForm.controls.userId.setValue(null);
    fixture.detectChanges();
    component.onTaskSubmit();
    expect(component.taskForm.valid).toBeFalse();
  });

  it('should call reset form', () => {
    component.submitButtonText = 'Update';
    component.resetForm();
    expect(component.isSubmitted).toBeFalsy();
  });

  it('should call onTaskSubmit ', () => {
    component.onTaskSubmit();
    expect(component.isSubmitted).not.toBeFalsy();
  });

  it('should call add parent task', () => {
    spyOn(taskService, 'addParentTask').and.returnValue(of(parentTaskList));
    component.addParentTask(parentTaskList[0]);
    expect(component.isSubmitted).toBeFalsy();
  });

  it('should call add task', () => {
    spyOn(taskService, 'addOrUpdateTask').and.returnValue(of(taskList[0]));
    component.addTask(taskList[0]);
    expect(component.isSubmitted).toBeFalsy();
  });

  it('on get task by Id', () => {
    const mockTaskList = taskService.getTaskData(taskList)[0];
    const task = mockTaskList[0];
    spyOn(component, 'getTaskById');
    component.getTaskById(1);
    component.task = task;
    expect(component.task).toBeUndefined();
  });

  it('should call clearSearchType', () => {
    component.clearSearchType();
    expect(component.selectSearch).toEqual('');
  });

  it('should call selectRow for project', () => {
    component.selectedRow(projectList[0], 'project');
    expect(component.selectSearch).toEqual(projectList[0].project);
  });

  it('should call selectRow for user', () => {
    component.selectedRow(projectList[0].user[0], 'user');
    expect(component.selectSearch).toEqual(projectList[0].user[0].firstName + ' ' + projectList[0].user[0].lastName);
  });

  it('should call selectRow for parent task', () => {
    component.selectedRow(parentTaskList[0], 'parentTask');
    expect(component.selectSearch).toEqual(parentTaskList[0].parentTask );
  });

  it('should call get all projects', () => {
    spyOn(projectService, 'getAllProjects').and.returnValue(of(projectList));
    projectService.getProjectData(projectList);
    component.getAllProjects();
    expect(projectService.getAllProjects).toHaveBeenCalled();
  });

  it('should get all parent task', () => {
    spyOn(taskService, 'getAllParentTasks').and.returnValue(of(parentTaskList));
    component.getAllParentTasks();
    expect(taskService.getAllParentTasks).toHaveBeenCalled();
  });

  it('should call get all users', () => {
    const userList = [
        {
          id: 3,
          firstName: 'Anu',
          lastName: 'John',
          employeeId: 68253,
          projectData: {
            id: 2,
            project: 'Test project',
            startDate: '2020-07-16T00:00:00.000+00:00',
            endDate: '2020-07-24T00:00:00.000+00:00',
            priority: 8
          },
          isManager: 1
        }];
    spyOn(userService, 'getAllUsers').and.returnValue(of(userList));
    component.getAllUsers();
    expect(userService.getAllUsers).toHaveBeenCalled();
  });

  it('Should trigger Add parent task', () => {
    component.isParentTask(true);
    expect(component.isParent).not.toBeFalsy();
  });

});
