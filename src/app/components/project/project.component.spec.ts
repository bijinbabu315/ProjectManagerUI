import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComponent } from './project.component';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Project } from 'src/app/model/project';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListFilter } from 'src/app/list-filter.pipe';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let projectService: ProjectService;
  let userService: UserService;
  // create new instance of FormBuilder
  const formBuilder: FormBuilder = new FormBuilder();

  const mockProjectList = [{
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

  const newProject = {
  id: 2,
  project: 'Test project',
  startDate: new Date(),
  endDate: new Date(),
  priority: 22,
  user: [   {
      id: 3,
      firstName: 'Anu',
      lastName: 'John',
      employeeId: 68253,
      isManager: 1
    }
  ]
};

  const projectData = {
  id: 2,
  project: 'Test project',
  startDate: new Date(),
  endDate: new Date(),
  priority: 22,
  user:   {
      id: 3,
      firstName: 'Anu',
      lastName: 'John',
      employeeId: 68253,
      isManager: 1
    }
};

  const mockUserList = [
    {
      id: 3,
      firstName: 'Anu',
      lastName: 'John',
      employeeId: 68253,
      projectId: 2,
      isManager: 1,
      taskId: null
    },
    {
      id: 2,
      firstName: 'Diya',
      lastName: 'Sobin',
      employeeId: 15892,
      projectId: 1,
      isManager: 1,
      taskId: null
    },
    {
      id: 1,
      firstName: 'Biji',
      lastName: 'Babu',
      employeeId: 608877,
      projectId: 2,
      isManager: null,
      taskId: null
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [ ProjectComponent, ListFilter],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [ProjectService, UserService, { provide: FormBuilder, useValue: formBuilder }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    projectService = TestBed.inject(ProjectService);
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return form as false', () => {
    const controlsInForm = component.formControls;
    controlsInForm.project.setValue('');
    component.projectForm.controls.project.setValue(null);
    component.projectForm.controls.userId.setValue(null);
    fixture.detectChanges();
    component.addProject();
    expect(component.projectForm.valid).toBeFalse();
  });

  it('should call add project method', () => {
    component.projectForm = formBuilder.group(mockProjectList[0]);
    component.user = mockUserList[0];
    component.addProject();
    expect(component.isSubmitted).not.toBeFalsy();
  });

  it('should call reset form', () => {
    component.resetForm();
    expect(component.isSubmitted).toBeFalsy();
  });

  it('should call reset form', () => {
    component.submitButtonText = 'Update';
    component.resetForm();
    expect(component.isSubmitted).toBeFalsy();
  });


  it('edit project', () => {
    component.userListFromService = mockUserList;
    component.user = mockUserList[0];
    component.editProject(projectData);
    expect(component.submitButtonText).toEqual('Update');
  });

  it('call add new project', () => {
    spyOn(projectService, 'addOrEditProject').and.returnValue(of(newProject));
    spyOn(projectService, 'getAllProjects').and.returnValue(of(mockProjectList));
    component.saveOruUpdateProject(newProject);
    expect(projectService.addOrEditProject).toHaveBeenCalled();
  });

  it('select project manager', () => {
    component.previousManager = {
      id: 2,
      firstName: 'Diya',
      lastName: 'Sobin',
      employeeId: 15892,
      isManager: 1,
      taskId: 1,
      projectId: 1
    };
    component.submitButtonText = 'Update';
    spyOn(userService, 'addOrEditUser').and.returnValue(of(newProject));
    component.selectedUser(mockUserList[0]);
    expect(component.userSearch).toEqual('Anu John');
  });


  it('list project managers', () => {
    spyOn(userService, 'getAllUsers').and.returnValue(of(mockUserList));
    component.getAllUsers();
    expect(userService.getAllUsers).toHaveBeenCalled();
  });

  it('call sort with project startDate', () => {
    component.projectList = mockProjectList;
    component.sortProjectList('startDate');
  });

  it('call sort with project endDate', () => {
    component.projectList = mockProjectList;
    component.sortProjectList('endDate');
  });

  it('call sort with project priority', () => {
    component.projectList = mockProjectList;
    component.sortProjectList('priority');
  });

  it('call sort with project Completed', () => {
    component.projectList = mockProjectList;
    component.sortProjectList('Completed');
  });

});
