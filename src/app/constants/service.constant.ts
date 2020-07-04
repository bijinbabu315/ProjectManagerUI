/** User Service URLS */
export class UserServiceURLS {

    /** Gets save or update */
    public static get SAVE_OR_UPDATE(): string { return '/user/saveOrUpdateUser'; }

    /** Gets get all user */
    public static get GET_ALL_USERS(): string { return '/user/getAllUsers'; }

    /** Gets delete user */
    public static get DELETE_USER(): string { return '/user/deleteUser'; }
}

/** Project Service URLS */
export class ProjectServiceURLS {

    /** Gets save or update */
    public static get SAVE_OR_UPDATE(): string { return '/project/saveOrUpdateProject'; }

    /** Gets get all projects */
    public static get GET_ALL_PROJECTS(): string { return '/project/getAllProjects'; }

    /** Gets delete project */
    public static get DELETE_PROJECT(): string { return '/project/deleteProject'; }
}