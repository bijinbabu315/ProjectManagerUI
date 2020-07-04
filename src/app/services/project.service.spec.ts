import { TestBed } from '@angular/core/testing';

import { ProjectService } from './project.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Project } from '../model/project';
import { environment } from 'src/environments/environment';
import { ProjectServiceURLS } from '../constants/service.constant';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.apiUrl;

  const projectList = [
    {
      id: 1,
      project: 'IIHT Project',
      startDate: new Date(),
      endDate: new Date(),
      priority: 7,
      user: {
        id: 1,
        firstName: 'Biji',
        lastName: 'Babu',
        employeeId: '68536',
        project: null,
        task: null
      },
      noOfTasks: 0,
      noOfCompletedTask: 0
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService]
    });
    service = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the avilable list of projects', () => {
    let response;
    spyOn(service, 'getAllProjects').and.returnValue(of(projectList));
    service.getAllProjects().subscribe(projects => {
      response = projects;
    });

    expect(response).toEqual(projectList);
  });

  it('should add or edit a project', () => {

    service.addOrEditProject(projectList[0]).subscribe(resp => {
      expect(resp).toBe(projectList[0]);
    });
    const req = httpMock.expectOne(baseUrl + ProjectServiceURLS.SAVE_OR_UPDATE);
    expect(req.request.method).toBe('POST');
    req.flush(projectList[0]);
  });


  it('should delete a priject', () => {
    service.deleteProject('1').subscribe(resp => {
      expect(resp).toBeTruthy();
    });
    const req = httpMock.expectOne(baseUrl + ProjectServiceURLS.DELETE_PROJECT + '/1');
    expect(req.request.method).toBe('DELETE');
  });
});
