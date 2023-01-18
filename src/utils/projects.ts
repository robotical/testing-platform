import { ProjectDbType } from "../interfaces/project";

// get project by id given array of projects and id
export const getProjectById = (projects: ProjectDbType[], id: string) => {
  return projects.find((project) => project.id === id);
};
