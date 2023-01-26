import { DbProject } from "../interfaces/sessions";

const projectNameInLocalStorage = (projectName: string) => `viewedSessions - ${projectName}`;

// mark session as viewed in the local-storage
export const markSessionAsViewedInTheLocalStorage = (project: DbProject, sessionId: string) => {
    const projectName = project[Object.keys(project)[0]].project;
    const viewedSessions = JSON.parse(localStorage.getItem(projectNameInLocalStorage(projectName)) || "{}");
    viewedSessions[sessionId] = true;
    localStorage.setItem(projectNameInLocalStorage(projectName), JSON.stringify(viewedSessions));
};

// is the session viewed in the local-storage
export const isSessionViewed = (project: DbProject, sessionId: string) => {
    const projectName = project[Object.keys(project)[0]].project;
    const viewedSessions = JSON.parse(localStorage.getItem(projectNameInLocalStorage(projectName)) || "{}");
    return viewedSessions[sessionId];
}
