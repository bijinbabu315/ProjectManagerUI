import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Project } from 'src/app/model/project';
import { User } from 'src/app/model/user';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  public projectForm: FormGroup;
  projectList: Project[];
  isSubmitted = false;
  submitButtonText = 'Add' ;
  searchProject: string;
  searchType = 'project' ;
  searchTypeUser = 'user';
  previousManager: User;

  // Manager add popup
  userList: User[];
  userSearch: string;
  user: User;
  project: Project;

  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllProjects();
    this.projectForm = new FormGroup({
      id: new FormControl(),
      project: new FormControl('', [Validators.required]),
      setDate: new FormControl(),
      startDate: new FormControl({ value: '', disabled: true }),
      endDate: new FormControl({ value: '', disabled: true }),
      priority: new FormControl(0),
      user: new FormControl({ value: '', disabled: true }, [Validators.required]),
      userId: new FormControl('', [Validators.required])
    });

  }
  get formControls(): any { return this.projectForm.controls; }

  /**
   * Gets all projects
   */
  getAllProjects(): void {
    this.projectService.getAllProjects()
      .subscribe(data => {
        this.projectList = data;
        this.getAllUsers();
      });
  }

  /**
   * Gets all users
   */
  getAllUsers(): void {
    this.userService.getAllUsers()
      .subscribe(data => {
        this.userList = data.filter(dataElement => dataElement.isManager !== 1);
      });
  }

  /**
   * Adds project
   * @returns project Project
   */
  addProject(): void {
    this.isSubmitted = true;
    if (this.projectForm.invalid) {
      return;
    } else {
      const projectFormValue = this.projectForm.value;
      const project: Project = {
        id: projectFormValue.id,
        project: projectFormValue.project,
        startDate: new Date(projectFormValue.startDate),
        endDate: new Date(projectFormValue.endDate),
        priority: projectFormValue.priority === null ? 0 : projectFormValue.priority,
        user : [this.user]
      };
      this.saveOruUpdateProject(project);
    }
  }

  /**
   * Saves oru update project
   * @param project Project
   */
  saveOruUpdateProject(project: Project): void {
    this.projectService.addOrEditProject(project)
        .subscribe(res => {
          this.getAllProjects();
          this.resetForm();
        });
  }

  /**
   * Selected user
   * @param user User
   */
  selectedUser(user): void {
    this.user = user;
    this.projectForm.get('userId').setValue(user.id);
    this.projectForm.get('user').setValue(user.firstName + ' ' + user.lastName);
    this.userSearch = user.firstName + ' ' + user.lastName;
    if ( this.previousManager !== null && this.submitButtonText === 'Update' && this.previousManager.id !== this.user.id) {
      this.previousManager.projectData = null;
      this.previousManager.isManager = null;
      this.userService.addOrEditUser(this.previousManager).subscribe(res => {
        this.previousManager = null;
      });
    }
  }

  /**
   * Sets date picker values
   * @param checked setDateCheckBox value
   */
  setDatePickerValues(checked): void {
    const startDate = this.projectForm.get('startDate');
    const endDate = this.projectForm.get('endDate');
    const today = new Date();
    const tomorrow = new Date(new Date().setDate(today.getDate() + 1));
    if (checked) {
      const minStartDay = new Date().toISOString().split('T')[0];
      const minEndDay = tomorrow.toISOString().split('T')[0];
      startDate.enable();
      document.getElementsByName('startdate')[0].setAttribute('min', minStartDay);
      startDate.setValue(new Date().toISOString().substr(0, 10));
      endDate.enable();
      document.getElementsByName('enddate')[0].setAttribute('min', minEndDay);
      endDate.setValue(tomorrow.toISOString().substr(0, 10));
    } else {
      startDate.disable();
      startDate.setValue('');
      endDate.disable();
      endDate.setValue('');
    }
  }

  /**
   * Edits project
   * @param project ProjectData
   */
  editProject(project: Project): void {
    this.previousManager = project.user;
    this.project = project;
    this.user = project.user;
    this.submitButtonText = 'Update';
    const editProject = {
      id: this.project.id,
      project: this.project.project,
      setDate: this.project.startDate !== null && this.project.endDate !== null,
      startDate: this.project.startDate,
      endDate: this.project.endDate,
      priority: this.project.priority,
      user: this.project.user.firstName + '  ' + this.project.user.lastName,
      userId: this.project.user.id
    };
    this.projectForm.setValue(editProject);
    this.setDatePickerValues(editProject.setDate);
  }

  /**
   * Resets form
   */
  resetForm(): void {
    if (this.submitButtonText === 'Update') {
      this.submitButtonText = 'Add';
    }
    this.setDatePickerValues(false);
    this.isSubmitted = false;
    this.projectForm.controls.priority.setValue(0);
    this.projectForm.reset();

  }

  /**
   * Deletes project
   * @param id project ID
   */
  deleteProject(project: Project): void {
    delete project.user;
    this.userService.deleteProjectInUser(project).subscribe(deleteData => {
      this.projectService.deleteProject(project.id.toString())
      .subscribe(data => {
        this.getAllProjects();
        this.resetForm();
      });
    });
  }

  /**
   * Sorts project list
   * @param paramName sortBy
   */
  sortProjectList(paramName: string): void {
    switch (paramName) {
      case 'startDate':
        this.projectList = this.projectList.sort((a, b) => {
          return new Date(a.startDate) > new Date(b.startDate) ? -1 : 1;
        });
        break;
      case 'endDate':
        this.projectList = this.projectList.sort((a, b) => {
          return new Date(a.endDate) > new Date(b.endDate) ? -1 : 1;
        });
        break;
      case 'priority':
        this.projectList = this.projectList.sort((a, b) => {
          return a.priority > b.priority ? -1 : 1;
        });
        break;
      case 'Completed':
        this.projectList = this.projectList.sort((a, b) => {
          return a.noOfCompletedTask > b.noOfCompletedTask ? -1 : 1;
        });
        break;
    }
  }
}
