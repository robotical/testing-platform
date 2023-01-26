import { Fragment } from "react";
import { GoDiffAdded } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { FormElementNames } from "../../../../pages/ManagerEditProject";
import { DialogActionPayloadType } from "../../../../store/dialog-slice";
import {
  addInstructionMsg,
  changeInstructionHeader,
  changeInstructionMsg,
  changeInstructionType,
  removeInstructionMsg,
} from "../../../../store/project-edit-slice";
import randomHashGenerator from "../../../../utils/random-hash-generator";
import Expandable from "../../../Expandable";
import FormGroup from "../../FormGroup";
import styles from "./styles.module.css";

export type InstructionsProps = {
  phaseIdx: number;
  instructions: DialogActionPayloadType;
};

export default function Instructions({
  instructions,
  phaseIdx,
}: InstructionsProps) {
  const dispatch = useDispatch();

  const onHeaderChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(changeInstructionHeader({ phaseIdx, header: event.target.value }));
  };

  const onMsgTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    msgIdx: number
  ) => {
    dispatch(
      changeInstructionMsg({
        phaseIdx: phaseIdx,
        msgIdx: msgIdx,
        msg: event.target.value,
      })
    );
  };

  const onMsgTypeChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    msgIdx: number
  ) => {
    dispatch(
      changeInstructionType({
        phaseIdx: phaseIdx,
        msgIdx: msgIdx,
        type: event.target.value,
      })
    );
  };

  const addMsgHandler = () => {
    dispatch(addInstructionMsg({ phaseIdx }));
  };

  const removeMsgHandler = (msgIdx: number) => {
    alert("Are you sure you want to remove message: " + (msgIdx + 1));
    dispatch(removeInstructionMsg({ phaseIdx, msgIdx }));
  };

  return (
    <Expandable
      title="Instructions"
      uniqueId={"msg" + phaseIdx + "instructions"}
    >
      <div className={styles.instructions}>
        <h3>Instructions</h3>
        <FormGroup
          name={FormElementNames.header + phaseIdx}
          label="Header"
          type="text"
          value={instructions.header}
          onChange={onHeaderChange}
        />
        <div className={styles.msgs}>
          {instructions.msgs.map((msg, index) => {
            const msgJSX = (
              <Expandable
                uniqueId={"msg" + index + phaseIdx}
                title={`Message ${index + 1}`}
                key={index}
              >
                <div
                  className={styles.remove}
                  onClick={() => removeMsgHandler(index)}
                >
                  <MdDeleteForever /> <p>Remove Message</p>
                </div>
                <div
                  className={styles.msg}
                  key={index}
                >
                  <FormGroup
                    name={FormElementNames.msg_type + index + phaseIdx}
                    label={"Type"}
                    type="radio"
                    options={["info", "success"]}
                    value={msg.type}
                    onChange={(e) => onMsgTypeChange(e, index)}
                  />

                  <FormGroup
                    name={FormElementNames.msg + index + phaseIdx}
                    label={"Message"}
                    type="textarea"
                    value={msg.msg}
                    onChange={(e) => onMsgTextChange(e, index)}
                  />
                </div>
              </Expandable>
            );
            if (index === instructions.msgs.length - 1) {
              return (
                <Fragment key={index}>
                  {msgJSX}
                  <div
                    className={styles.add}
                    key={index + "add phase"}
                    onClick={addMsgHandler}
                  >
                    <GoDiffAdded /> <p>Add Message</p>
                  </div>
                </Fragment>
              );
            } else {
              return msgJSX;
            }
          })}
        </div>
      </div>
    </Expandable>
  );
}
