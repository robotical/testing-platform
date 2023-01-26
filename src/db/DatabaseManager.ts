import db from "./config";
import { get, ref, set } from "firebase/database";
import { SessionType } from "../store/session-slice";
import { DbProject } from "../interfaces/sessions";
import { ProjectDbType } from "../interfaces/project";

const PROJECTS_PATH = "projects";
const SESSIONS_PATH = "sessions";

export default class DatabaseManager {
  static async getProjects() {
    const dbref = ref(db, PROJECTS_PATH);
    const data = await get(dbref);
    return { projectNames: Object.keys(data.val()), fullProjects: data.val() };
  }

  // save project to database
  static async saveProject(project: ProjectDbType) {
    const dbref = ref(db, PROJECTS_PATH + "/" + project.name);
    return set(dbref, project);
  }

  static async deleteProject(projectName: string) {
    const dbref = ref(db, PROJECTS_PATH + "/" + projectName);
    return set(dbref, null);
  }

  static async saveSession(session: SessionType) {
    const dbref = ref(
      db,
      SESSIONS_PATH + "/" + session.project + "/" + session.id
    );
    return set(dbref, session);
  }

  static async getSessionProjects() {
    const dbref = ref(db, SESSIONS_PATH);
    const data = await get(dbref);
    return { projectNames: Object.keys(data.val()), fullProjects: data.val() };
  }
}
