import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import RadioButton from "../../components/form/RadioButton";
import DatabaseManager from "../../db/DatabaseManager";
import { ProjectDbType, ProjectsDbType } from "../../interfaces/project";
import { setRouter } from "../../store/router-slice";
import { getProjectById } from "../../utils/projects";
import { TestingProjectProps } from "../TestingProject";
import styles from "./styles.module.css";

export default function Tester() {
  const [selectedProject, setSelectedProject] = useState<ProjectDbType>();
  const [projects, setProjects] = useState<string[]>([]);
  const [fullPrjcts, setFullPrjcts] = useState<ProjectsDbType>({});
  const dispatch = useDispatch();

  useEffect(() => {
    DatabaseManager.getProjects().then(({ projectNames, fullProjects }) => {
      setProjects(projectNames);
      setFullPrjcts(fullProjects);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedProject) {
      dispatch(
        setRouter({
          id: "testing-project",
          props: { project: selectedProject } as TestingProjectProps,
        })
      );
    }
  };

  return (
    <div className={styles.testerPage}>
      <h1>Select a Project to Test</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          {projects.map((project, idx) => {
            const projectObj = fullPrjcts[project];
            return (
              <RadioButton
                checked={selectedProject?.id === projectObj.id}
                label={projectObj.name}
                name={projectObj.name}
                onChange={(e) =>
                  setSelectedProject(projectObj)
                }
                value={projectObj.id}
                key={idx}
              />
            );
          })}
        </div>
        <button type="submit" className={styles.submitButton}>
          Start Testing
        </button>
      </form>
    </div>
  );
}
