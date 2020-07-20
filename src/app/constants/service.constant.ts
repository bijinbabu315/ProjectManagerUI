/** User Service URLS */
export class UserServiceURLS {

    /** Gets save or update */
    public static get SAVE_OR_UPDATE(): string { return '/pm-user/user/saveOrUpdateUser'; }

    /** Gets get all user */
    public static get GET_ALL_USERS(): string { return '/pm-user/user/getAllUsers'; }

    /** Gets delete user */
    public static get DELETE_USER(): string { return '/pm-user/user/deleteUser'; }
}

/** Project Service URLS */
export class ProjectServiceURLS {

    /** Gets save or update */
    public static get SAVE_OR_UPDATE(): string { return '/pm-project/project/saveOrUpdateProject'; }

    /** Gets get all projects */
    public static get GET_ALL_PROJECTS(): string { return '/pm-project/project/getAllProjects'; }

    /** Gets delete project */
    public static get DELETE_PROJECT(): string { return '/pm-project/project/deleteProject'; }
}

/** Task service urls */
export class TaskServiceURLS {

  /** Gets save or update */
  public static get SAVE_OR_UPDATE(): string { return '/pm-project/task/saveOrUpdateTask'; }

  /** Gets get all tasks */
  public static get GET_ALL_TASKS(): string { return '/pm-project/task/getAllTasks'; }


  /** Gets save update parent task */
  public static get SAVE_UPDATE_PARENT_TASK(): string { return '/pm-project/parentTask/saveOrUpdateParentTask'; }

  /** Gets get all parent tasks */
  public static get GET_ALL_PARENT_TASKS(): string { return '/pm-project/parentTask/getAllParentTasks'; }

}
