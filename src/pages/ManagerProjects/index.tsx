import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import RadioButton from "../../components/form/RadioButton";
import DatabaseManager from "../../db/DatabaseManager";
import { DbProject, DbProjects } from "../../interfaces/sessions";
import { setRouter } from "../../store/router-slice";
import { ProjectDataProps } from "../ProjectData";
import styles from "./styles.module.css";

export default function ManagerProjects() {
  const [selectedProject, setSelectedProject] = useState<string>();
  const [projects, setProjects] = useState<string[]>([]);
  const [fullProjects, setFullProjects] = useState<DbProjects>({});
  const dispatch = useDispatch();

  useEffect(() => {
    DatabaseManager.getSessionProjects().then(({projectNames, fullProjects}) => {
      setProjects(projectNames);
      setFullProjects(fullProjects);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedProject) {
      dispatch(
        setRouter({
          id: "project-data",
          props: { project: fullProjects[selectedProject] } as ProjectDataProps,
        })
      );
    }
  };

  return (
    <div className={styles.managerPage}>
      <h1>Select a Project to Test</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          {projects.map((project, idx) => (
            <RadioButton
              checked={selectedProject === project}
              label={project}
              name={project}
              onChange={(e) =>
                setSelectedProject(e.target.value)
              }
              value={project}
              key={idx}
            />
          ))}
        </div>
        <button type="submit" className={styles.submitButton}>
          Start Testing
        </button>
      </form>
    </div>
  );
}
