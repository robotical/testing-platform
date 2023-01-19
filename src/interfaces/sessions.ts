import { SessionType } from "../store/session-slice";

export type DbProjects = {
    [projectName: string]: DbProject;
};

export type DbProject = {
    [sessionId: string]: SessionType;
};

