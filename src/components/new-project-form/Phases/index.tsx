import { useDispatch } from "react-redux";
import { PhaseType } from "../../../interfaces/project";
import Expandable from "../../Expandable";
import Instructions from "./Instructions";
import Questionnaire from "./Questionnaire";
import styles from "./styles.module.css";
import { GoDiffAdded } from "react-icons/go";
import { addPhase, removePhase } from "../../../store/project-edit-slice";
import { MdDeleteForever } from "react-icons/md";
import randomHashGenerator from "../../../utils/random-hash-generator";
import { Fragment } from "react";

type PhasesProps = {
  phases: PhaseType[];
};

export default function Phases({ phases }: PhasesProps) {
  const dispatch = useDispatch();

  const addPhaseHandler = () => {
    dispatch(addPhase());
  };

  const removePhaseHandler = (phaseIdx: number) => {
    alert("Are you sure you want to remove phase: " + (phaseIdx + 1));
    dispatch(removePhase({ index: phaseIdx }));
  };

  return (
    <div className={styles.phases}>
      {phases.map((phase, index) => {
        const phaseJSX = (
          <Expandable
            key={index}
            uniqueId={"phase" + index}
            title={`Phase ${index + 1}`}
          >
            <div
              className={styles.remove}
              onClick={() => removePhaseHandler(index)}
            >
              <MdDeleteForever /> <p>Remove phase</p>
            </div>
            <div className={styles.phase} key={index}>
              <Instructions instructions={phase.instructions} phaseIdx={index}/>
              <Questionnaire questionnaire={phase.questionnaire} phaseIdx={index}/>
            </div>
          </Expandable>
        );

        if (index === phases.length - 1) {
          return (
            <Fragment key={index}>
              {phaseJSX}
              <div
                className={styles.addPhase}
                key={index + "add phase"}
                onClick={addPhaseHandler}
              >
                <GoDiffAdded /> <p>Add phase</p>
              </div>
            </Fragment>
          );
        } else {
          return phaseJSX;
        }
      })}
    </div>
  );
}
