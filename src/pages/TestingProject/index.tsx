import ExpandableTestingMenu from "../../components/ExpandableTestingMenu";
import { ProjectDbType } from "../../interfaces/project";
import styles from "./styles.module.css";
import { BsInfoLg } from "react-icons/bs";
import { GrFormNext } from "react-icons/gr";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showDialog } from "../../store/dialog-slice";
import DialogModal from "../../components/dialog-modal";
import {
  finalQuestionnaire,
  generalTestInstructionsDialog,
} from "../../utils/dialogs/testing";
import { QuestionnaireNextEnum, showQuestionnaire } from "../../store/questionnaire-slice";
import QuestionnaireModal from "../../components/Questionnaire-modal";

export type TestingProjectProps = {
  project: ProjectDbType;
};

export default function TestingProject({ project }: TestingProjectProps) {
  const dispatch = useDispatch();

  const [currentDialog, setCurrentDialog] = useState(
    generalTestInstructionsDialog(project.name, project.phases[0].instructions)
  );
  const [currentPhaseIdx, setCurrentPhaseIdx] = useState(0);

  useEffect(() => {
    dispatch(showDialog(currentDialog));
  }, []);

  const infoHandler = () => {
    dispatch(showDialog(currentDialog));
  };

  const nextHandler = () => {
    const currentPhaseNewIdx = currentPhaseIdx + 1;
    const isThereAnotherPhase = !!project.phases[currentPhaseNewIdx];
    const newInstructions = project.phases[currentPhaseNewIdx]?.instructions;
    const next = isThereAnotherPhase
      ? { type: QuestionnaireNextEnum.DIALOG, next: newInstructions }
      : { type: QuestionnaireNextEnum.QUESTIONNAIRE, next: finalQuestionnaire() };
    dispatch(
      showQuestionnaire({
        ...project.phases[currentPhaseIdx].questionnaire,
        next,
      })
    );
    setCurrentPhaseIdx(currentPhaseNewIdx);
    isThereAnotherPhase &&
      setCurrentDialog(project.phases[currentPhaseNewIdx].instructions);
  };

  return (
    <div className={styles.projectWrapper}>
      <DialogModal />
      <QuestionnaireModal />
      <ExpandableTestingMenu>
        <div className={styles.testingMenuContent}>
          <div onClick={infoHandler}>
            Info
            <BsInfoLg size={30} />
          </div>
          <div onClick={nextHandler}>
            Next
            <GrFormNext size={30} />
          </div>
        </div>
      </ExpandableTestingMenu>
      <iframe className={styles.iframe} src={project.url} title="Project" />
    </div>
  );
}
