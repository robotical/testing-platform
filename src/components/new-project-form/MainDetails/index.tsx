import React from "react";
import { useDispatch } from "react-redux";
import { ProjectDbType } from "../../../interfaces/project";
import { FormElementNames } from "../../../pages/ManagerEditProject";
import { setMainDetails } from "../../../store/project-edit-slice";
import Expandable from "../../Expandable";
import FormGroup from "../FormGroup";

type MainDetailsProps = {
  project: ProjectDbType;
};

export default function MainDetails({ project }: MainDetailsProps) {
  const dispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch(setMainDetails({ name, value }));
  };

  return (
    <Expandable title="Main details" uniqueId={"main details"}>
      <FormGroup
        name={FormElementNames.name}
        label="Name"
        type="text"
        value={project.name}
        onChange={handleChange}
      />
      <FormGroup
        name={FormElementNames.description}
        label="Description"
        type="textarea"
        value={project.description}
        onChange={handleChange}
      />
      <FormGroup
        name={FormElementNames.url}
        label="URL"
        type="text"
        value={project.url}
        onChange={handleChange}
      />
    </Expandable>
  );
}
