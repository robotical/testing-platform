import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import RadioButton from "../../components/form/RadioButton";
import DatabaseManager from "../../db/DatabaseManager";
import { ProjectDbType } from "../../interfaces/project";
import { setRouter } from "../../store/router-slice";
import { getProjectById } from "../../utils/projects";
import { TestingProjectProps } from "../TestingProject";
import styles from "./styles.module.css";

export default function Tester() {
  const [selectedProject, setSelectedProject] = useState<ProjectDbType>();
  const [projects, setProjects] = useState<ProjectDbType[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    DatabaseManager.getProjects().then((prjcts) => {
      setProjects(prjcts);
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
          {projects.map((project, idx) => (
            <RadioButton
              checked={selectedProject?.id === project.id}
              label={project.name}
              name={project.name}
              onChange={(e) =>
                setSelectedProject(getProjectById(projects, e.target.value))
              }
              value={project.id}
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
