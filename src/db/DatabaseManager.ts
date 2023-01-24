import db from "./config";
import { get, ref, set } from "firebase/database";
import { SessionType } from "../store/session-slice";
import { DbProject } from "../interfaces/sessions";

const PROJECTS_PATH = "projects";
const SESSIONS_PATH = "sessions";

export default class DatabaseManager {
  static async getProjects() {
    const dbref = ref(db, PROJECTS_PATH);
    const data = await get(dbref);
    return data.val();
  }
  
  static async saveSession(session: SessionType) {
    const dbref = ref(db, SESSIONS_PATH + "/" + session.project + "/" + session.id);
    return set(dbref, session);
  }

  static async getSessionProjects() {
    const dbref = ref(db, SESSIONS_PATH);
    const data = await get(dbref);
    return {projectNames: Object.keys(data.val()), fullProjects: data.val()};
  }

  static async markSessionsAsViewed(projectName: string) {
    const dbref = ref(db, SESSIONS_PATH + "/" + projectName);
    const data = await get(dbref);
    const sessions = data.val();
    const updatedSessions = Object.keys(sessions).map((key) => {
      return {...sessions[key], viewed: true};
    });
    // transform array of sessions into object of sessions
    const updatedSessionsObj = updatedSessions.reduce((acc, session) => {
      acc[session.id] = session;
      return acc;
    }, {} as DbProject);
    return set(dbref, updatedSessionsObj);
    }
}
