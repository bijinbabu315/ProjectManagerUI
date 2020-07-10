import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskComponent } from './view-task.component';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ListFilter } from 'src/app/list-filter.pipe';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
  let projectService: ProjectService;
  let taskService: TaskService;

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


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule],
      declarations: [ ViewTaskComponent, ListFilter ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [ProjectService, TaskService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(ProjectService);
    taskService = TestBed.inject(TaskService);
    fixture.detectChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call get all projects', () => {
    spyOn(projectService, 'getAllProjects').and.returnValue(of(projectList));
    component.getAllProjects();
    expect(projectService.getAllProjects).toHaveBeenCalled();
  });


  it('should call get all tasks', () => {
    spyOn(taskService, 'getAllTasks').and.returnValue(of(taskList));
    component.getAllTasks();
    expect(taskService.getAllTasks).toHaveBeenCalled();
  });

  it('select project in task module', () => {
    component.editTask(taskList[0]);
    component.selectedRow(projectList[0]) ;
    expect(component.projectSearch).toEqual('Test project');
  });

  it('should call end task', () => {
    spyOn(taskService, 'addOrUpdateTask').and.returnValue(of(taskList[0]));
    spyOn(taskService, 'getAllTasks').and.returnValue(of(taskList));
    component.endTask(taskList[0]);
    expect(taskService.addOrUpdateTask).toHaveBeenCalled();
  });

  it('should sort with task startDate', () => {
    component.taskList = taskList;
    component.sortTaskList('startDate');
  });

  it('should sort with task endDate', () => {
    component.taskList = taskList;
    component.sortTaskList('endDate');
  });

  it('should sort with task priority', () => {
    component.taskList = taskList;
    component.sortTaskList('priority');
  });

  it('should sort with task Completed', () => {
    component.taskList = taskList;
    component.sortTaskList('Completed');
  });
});
