import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

/** to identify whether the button clicked or not */
  submitted = false;

  /** User form of user component */
  userForm: FormGroup;

  /** Submit button text of user component */
  submitButtonText = 'Add';

  /** User  of user component */
  user: User;

  /** User list of user component */
  userList: User[];

  /** User search of user component */
  userSearch: string;

  /** Search type of user component */
  searchType = 'user';

  /**
   * Creates an instance of user component.
   * @param formBuilder FormBuilder
   * @param userService UserService
   */
  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  /**
   * on init
   */
  ngOnInit(): void {
    /** fetch all available user's list */
    this.getAllUsers();
    /* creating the form group */
    this.userForm = this.formBuilder.group({
      id: [],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      employeeId: ['', Validators.required],
      projectId: '',
      taskId: ''
    });
  }

  /**
   * Gets form controls
   */
  get formControls(): any {
    return this.userForm.controls;
  }


/**
 * Determines whether user submit o
 * @returns user submit
 */
addUser(): any{
  this.submitted = true;
  /** checking whether the form is valid */
  if (this.userForm.invalid) {
    return;
  } else {
    const user: User = this.userForm.value;
    // service call to add or edit user
    this.addOrEditUser(user);
  }
}

/**
 * Resets form
 */
resetForm(): void {
  this.submitButtonText = 'Add';
  this.submitted = false;
  this.userForm.reset();
}

/**
 * Adds or edit user
 * @param user User
 */
addOrEditUser(user: User): void{
  this.userService.addOrEditUser(user)
    .subscribe(res => {
      this.getAllUsers();
      this.resetForm();
    });
}

/**
 * Gets all users
 */
getAllUsers(): void{
  this.userService.getAllUsers()
    .subscribe(data => {
      this.userList = data;
    });
}

/**
 * Edits user
 * @param user User
 */
editUser(user: User): void{
  this.user = user;
  this.submitButtonText = 'Update';
  const userEdit = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    employeeId: user.employeeId,
    projectId: '',
     taskId: ''
  };
  this.userForm.setValue(userEdit);
}

/**
 * Deletes user User
 * @param id Id
 */
deleteUser(id: string): void{
  this.userService.deleteUser(id)
    .subscribe(data => {
      this.getAllUsers();
      this.resetForm();
    });
}

/**
 * Sorts user list
 * @param paramName SortBy
 */
sortUserList(paramName: string): void{
  switch (paramName) {
    case 'firstName':
      this.userList = this.userList.sort((a, b) => {
        return a.firstName < b.firstName ? -1 : 1;
      });
      break;
    case 'lastName':
      this.userList = this.userList.sort((a, b) => {
        return a.lastName < b.lastName ? -1 : 1;
      });
      break;
    case 'id':
      this.userList = this.userList.sort((a, b) => {
        return a.employeeId < b.employeeId ? -1 : 1;
      });
      break;
  }
}
}
