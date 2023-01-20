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
  generalTestInstructionsDialog,
  thankingDialog,
} from "../../utils/dialogs/testing";
import {
  QuestionnaireNextEnum,
  showQuestionnaire,
} from "../../store/questionnaire-slice";
import QuestionnaireModal from "../../components/Questionnaire-modal";
import { currentPhase, startSession } from "../../store/session-slice";

export type TestingProjectProps = {
  project: ProjectDbType;
};

export default function TestingProject({ project }: TestingProjectProps) {
  const dispatch = useDispatch();

  const [currentDialog, setCurrentDialog] = useState(
    generalTestInstructionsDialog(project.name, project.phases[0].instructions)
  );

  useEffect(() => {
    // start session
    dispatch(startSession({ phases: project.phases, project: project.name }));

    // show first dialog
    dispatch(showDialog(currentDialog));
  }, []);

  const infoHandler = () => {
    dispatch(showDialog(currentDialog));
  };

  const nextHandler = () => {
    const currentPhaseNewIdx = currentPhase + 1;
    const isThereAnotherPhase = !!project.phases[currentPhaseNewIdx];
    const newInstructions = project.phases[currentPhaseNewIdx]?.instructions;
    const next = isThereAnotherPhase
      ? { type: QuestionnaireNextEnum.DIALOG, next: newInstructions }
      : { type: QuestionnaireNextEnum.DIALOG, next: thankingDialog() };
    dispatch(
      showQuestionnaire({
        ...project.phases[currentPhase].questionnaire,
        next,
      })
    );
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
      <iframe className={styles.iframe} src={project.url} title="Project" allow="bluetooth"/>
    </div>
  );
}
