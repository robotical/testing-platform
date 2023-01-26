/**
 * ManagerEditProjectList
 * This component will be getting the list of projects from the database
 * and displaying them in a list. The user will be able to either edit, delete, add, or duplicate a project.
 */
import { useEffect, useState } from "react";
import DatabaseManager from "../../db/DatabaseManager";
import { MdDeleteForever } from "react-icons/md";
import { IoDuplicate } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";

import styles from "./styles.module.css";
import randomHashGenerator from "../../utils/random-hash-generator";
import { ProjectDbType, ProjectsDbType } from "../../interfaces/project";
import { useDispatch } from "react-redux";
import { setRouter } from "../../store/router-slice";
import { ManagerEditProjectProps } from "../ManagerEditProject";
import { GoDiffAdded } from "react-icons/go";
import { setNewProject } from "../../store/project-edit-slice";

export default function ManagerEditProjectList() {
  const [projects, setProjects] = useState<string[]>([]);
  const [fullPrjcts, setFullPrjcts] = useState<ProjectsDbType>({});
  const [refresh, setRefresh] = useState<boolean>(false);

  const dispatch = useDispatch();

  const addProjectHandler = () => {
    dispatch(setNewProject());
    dispatch(
      setRouter({
        id: "manager-edit-project",
        props: {
          projectProp: null,
          newOrEdit: "new",
        } as ManagerEditProjectProps,
      })
    );
  };

  useEffect(() => {
    // get projects
    DatabaseManager.getProjects().then(({ projectNames, fullProjects }) => {
      setProjects(projectNames);
      setFullPrjcts(fullProjects);
    });
  }, [refresh]);

  const handleEdit = (project: string) => {
    // Do something with the selected project, such as open a modal for editing
    dispatch(
      setRouter({
        id: "manager-edit-project",
        props: {
          projectProp: fullPrjcts[project],
          newOrEdit: "edit",
        } as ManagerEditProjectProps,
      })
    );
  };

  const handleDelete = (project: string) => {
    DatabaseManager.deleteProject(project).then(() => {
      setRefresh(!refresh);
    });
  };

  const handleDuplicate = (project: string) => {
    // Do something with the selected project, such as make a copy of it
    const projectObj = fullPrjcts[project];
    // change id and name
    const updatedProject: ProjectDbType = JSON.parse(
      JSON.stringify(projectObj)
    );
    updatedProject.id = projectObj.id + randomHashGenerator(3);
    updatedProject.name =
      projectObj.name + " duplicated " + randomHashGenerator(3);
    // store to db
    DatabaseManager.saveProject(updatedProject).then(() => {
      setRefresh(!refresh);
    });
  };

  return (
    <div>
      <div className={styles.add} onClick={addProjectHandler}>
        <GoDiffAdded /> <p>Add Project</p>
      </div>

      <ul className={styles.project_list}>
        {projects.map((project, index) => (
          <li key={index}>
            <p>
              {index + 1}. {project}
            </p>
            <div>
              <button onClick={() => handleEdit(project)}>
                <FaRegEdit />
                <p>edit</p>
              </button>
              <button onClick={() => handleDuplicate(project)}>
                <IoDuplicate />
                <p>duplicate</p>
              </button>
              <button onClick={() => handleDelete(project)}>
                <MdDeleteForever />
                <p>remove</p>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
