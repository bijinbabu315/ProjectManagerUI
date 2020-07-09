import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { UserServiceURLS } from '../constants/service.constant';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the list of added users', () => {
    const userList = [
      {
        id: 1,
        firstName: 'Biji',
        lastName: 'Babu',
        employeeId: '604857'
      },
      {
        id: 2,
        firstName: 'Sobin',
        lastName: 'Yohannan',
        employeeId: '589632'
      }
    ];
    let response;

    spyOn(service, 'getAllUsers').and.returnValue(of(userList));

    service.getAllUsers().subscribe(userData => {
      response = userData;
    });

    expect(response).toEqual(userList);
  });

  it('should add or edit a user', () => {
    const user: User = {
      id: 1,
      firstName: 'Sibi',
      lastName: 'Babu',
      employeeId: 658932,
      projectId: '',
      taskId: ''
    };
    service.addOrEditUser(user).subscribe(userInfo => {
      expect(userInfo).toBe(user);
    });
    const req = httpMock.expectOne(baseUrl + UserServiceURLS.SAVE_OR_UPDATE);
    expect(req.request.method).toBe('POST');
    req.flush(user);
  });

  it('should call a deleteProjectInUser ', () => {
    const project =  {
      id: 1,
      project: 'IIHT Project',
      startDate: new Date(),
      endDate: new Date(),
      priority: 7,
      noOfTasks: 0,
      noOfCompletedTask: 0
    };
    service.deleteProjectInUser(project).subscribe(resp => {
      expect(resp).toBeTruthy();
    });
    const req = httpMock.expectOne(baseUrl + UserServiceURLS.UPDATE_USER_ON_PROJECT_DELETE );
    expect(req.request.method).toBe('POST');
  });

  it('should delete a user', () => {
    service.deleteUser('1').subscribe(resp => {
      expect(resp).toBeTruthy();
    });
    const req = httpMock.expectOne(baseUrl + UserServiceURLS.DELETE_USER + '/1');
    expect(req.request.method).toBe('DELETE');
  });

});

