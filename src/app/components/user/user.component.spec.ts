import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListFilter } from 'src/app/list-filter.pipe';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { of } from 'rxjs';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: UserService;
  const formBuilder: FormBuilder = new FormBuilder();

  const newUser: User = {
    id: 1,
    firstName: 'Jijil',
    lastName: 'Kakkadathu',
    employeeId: 87896,
    projectId: '',
    taskId: ''
  };

  const userList = [
    {
      id: 1,
      firstName: 'Jijil',
      lastName: 'Kakkadathu',
      employeeId: 87896,
      projectId: '',
      taskId: ''
    },
    {
      id: 2,
      firstName: 'Achu',
      lastName: 'Kurian',
      employeeId: 75489,
      projectId: '',
      taskId: ''
    }
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [ UserComponent, ListFilter ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [UserService, { provide: FormBuilder, useValue: formBuilder }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return form as false', () => {
    const controlsInForm = component.formControls;
    controlsInForm.firstName.setValue('');
    component.userForm.controls.firstName.setValue(null);
    fixture.detectChanges();
    component.addUser();
    expect(component.userForm.valid).toBeFalse();
  });

  it('should call add user method', () => {
    component.userForm = formBuilder.group(newUser);
    component.addUser();
    expect(component.submitted).not.toBeFalsy();
  });

  it('should reset form', () => {
    component.resetForm();
    expect(component.submitted).toBeFalsy();
  });

  it('should call edit user', () => {
    component.editUser(newUser);
    expect(component.submitButtonText).toEqual('Update');
  });

  it('should call addOrEditUser', () => {
    spyOn(userService, 'addOrEditUser').and.returnValue(of(newUser));
    spyOn(userService, 'getAllUsers').and.returnValue(of(userList));
    component.addOrEditUser(newUser);
    expect(userService.addOrEditUser).toHaveBeenCalled();
  });

  it('should call delete user', () => {
    spyOn(userService, 'deleteUser').and.returnValue(of(newUser));
    component.deleteUser('1');
    expect(userService.deleteUser).toHaveBeenCalled();
  });

  it('should sort the list with first name', () => {
    component.userList = userList;
    component.sortUserList('firstName');
    expect(component.userList[0].firstName).toEqual('Achu');
  });

  it('should sort the list with last name', () => {
    component.userList = userList;
    component.sortUserList('lastName');
    expect(component.userList[0].firstName).toEqual('Jijil');
  });

  it('should sort the list with id', () => {
    component.userList = userList;
    component.sortUserList('id');
    expect(component.userList[0].id).toEqual(2);
  });
});
