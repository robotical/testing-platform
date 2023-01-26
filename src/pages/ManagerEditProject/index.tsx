import styles from "./styles.module.css";
import { ProjectDbType } from "../../interfaces/project";
import MainDetails from "../../components/new-project-form/MainDetails";
import Phases from "../../components/new-project-form/Phases";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store";
import { useEffect } from "react";
import { setProject } from "../../store/project-edit-slice";
import { resetExpandedSections } from "../../store/expanded-sections-slice";
import validateFullProject from "../../validation/edited-project-validation";
import { showDialog } from "../../store/dialog-slice";
import DialogModal from "../../components/dialog-modal";
import DatabaseManager from "../../db/DatabaseManager";

export type ManagerEditProjectProps = {
  projectProp: ProjectDbType | null;
  newOrEdit: "new" | "edit";
};

export enum FormElementNames {
  name = "name",
  description = "description",
  id = "id",
  url = "url",
  header = "header",
  msgs = "msgs",
  qstns = "qstns",
  answers = "answers",
  msg = "msg",
  qstn = "qstn",
  answer = "answer",
  msg_type = "msg_type",
  questionnaire_header = "questionnaire_header",
  qstn_type = "qstn_type",
  qstn_option = "qstn_options",
}

export default function ManagerEditProject({
  projectProp,
  newOrEdit
}: ManagerEditProjectProps) {
  const project = useSelector((state: IRootState) => ({
    ...state.projectEditSlice,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (newOrEdit === "edit") {
      dispatch(setProject(JSON.parse(JSON.stringify(projectProp))));
    } 
    dispatch(resetExpandedSections());
  }, [projectProp]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = await validateFullProject(project, newOrEdit === "new");
    if (errs.length > 0) {
      const errors = errs.filter((err) => err.error).map((err) => err.error);
      if (errors.length > 0) {
        return dispatch(
          showDialog({
            header: "Validation failed",
            msgs: errors.map((err) => ({ msg: err, type: "error" })),
          })
        );
      }
    }
    DatabaseManager.saveProject(project).then(() => {
      dispatch(
        showDialog({
          header: "Project saved",
          msgs: [{ msg: "Project saved successfully", type: "success" }],
        })
      );
    });
  };

  return (
    <div className={styles.managerEditProject}>
      <DialogModal />
      <h1>{project.name}</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <MainDetails project={project} />
        <Phases phases={project.phases} />
        <button className={styles.submit} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
