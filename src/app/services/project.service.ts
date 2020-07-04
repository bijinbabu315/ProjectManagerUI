import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Project } from '../model/project';
import { Observable } from 'rxjs';
import { ProjectServiceURLS } from '../constants/service.constant';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  /** Base url of project service */
  baseUrl = environment.apiUrl;
  /**
   * Creates an instance of project service.
   * @param http HttpClient
   */
  constructor(private http: HttpClient) { }

  /**
   * Adds or  edit project
   * @param project Project
   * @returns editproject result
   */
  addOrEditProject(project: Project): Observable<any> {
    const addOrEditProjectUrl = this.baseUrl + ProjectServiceURLS.SAVE_OR_UPDATE;
    return this.http.post<Project>(addOrEditProjectUrl, project);
  }

  /**
   * Gets all projects
   * @returns all projects
   */
  getAllProjects(): Observable<any>{
    const getAllProjectsUrl = this.baseUrl +  ProjectServiceURLS.GET_ALL_PROJECTS;
    return this.http.get(getAllProjectsUrl);
  }

  /**
   * Deletes project
   * @param id  ID
   */
  deleteProject(id: string): Observable<any> {
    const deleteProjectUrl = this.baseUrl +  ProjectServiceURLS.DELETE_PROJECT;
    return this.http.delete(`${deleteProjectUrl}/${id}`);
  }
}
