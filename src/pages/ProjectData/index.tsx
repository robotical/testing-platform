import { useState } from "react";
import { DbProject } from "../../interfaces/sessions";
import convertProjectType from "../../utils/get-average-session";
import IndividualSessions from "./IndividualSessions";
import styles from "./styles.module.css";

export type ProjectDataProps = {
  project: DbProject;
};

export default function ProjectData({ project }: ProjectDataProps) {
  const [view, setView] = useState<"all" | "average">("all");

  return (
    <div className={styles.dashboard_layout}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {project[Object.keys(project)[0]].project}
        </h1>
        <div className={styles.view_toggle}>
          <button
            className={`${styles.all_sessions_btn} ${
              view === "all" && styles.active
            }`}
            onClick={() => setView("all")}
          >
            All Sessions
          </button>
          <button
            className={`${styles.average_session_btn} ${
              view === "average" && styles.active
            }`}
            onClick={() => setView("average")}
          >
            Average Session
          </button>
        </div>
      </header>
      <div className={styles.main_content}>
        {view === "all" ? (
          <IndividualSessions
            project={project}
            type="individual"
            key={new Date().getTime() + "ALL"}
          />
        ) : (
          <IndividualSessions
            project={convertProjectType(project)}
            type="average"
            key={new Date().getTime() + "INDIV"}
          />
        )}
      </div>
    </div>
  );
}
