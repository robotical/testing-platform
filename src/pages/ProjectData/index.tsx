import { useState } from "react";
import { DbProject } from "../../interfaces/sessions";
import convertProjectType from "../../utils/get-average-session";
import IndividualSessions from "./IndividualSessions";

export type ProjectDataProps = {
  project: DbProject;
};


export default function ProjectData ({ project }: ProjectDataProps) {
    const [view, setView] = useState<"all" | "average">("all");

  return (
    <div className="dashboard-layout">
      <header className="header">
        <h1 className="title">{project[Object.keys(project)[0]].project}</h1>
        <div className="view-toggle">
          <button
            className={`all-sessions-btn ${view === "all" && "active"}`}
            onClick={() => setView("all")}
          >
            All Sessions
          </button>
          <button
            className={`average-session-btn ${view === "average" && "active"}`}
            onClick={() => setView("average")}
          >
            Average Session
          </button>
        </div>
      </header>
      <div className="main-content">
        {view === "all" ? (
          <IndividualSessions project={project} type="individual"  key={new Date().getTime() + "ALL"}/>
        ) : (
          <IndividualSessions project={convertProjectType(project)} type="average" key={new Date().getTime() + "INDIV"}/>
        )}
      </div>
    </div>
  );
}

