import db from "./config";
import { get, ref, set } from "firebase/database";
import { SessionType } from "../store/session-slice";

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
}
