import db from "./config";
import { get, ref } from "firebase/database";

const PROJECTS_PATH = "projects";

export default class DatabaseManager {
  static async getProjects() {
    const dbref = ref(db, PROJECTS_PATH);
    const data = await get(dbref);
    return data.val();
  }
  
}
