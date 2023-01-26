import { Fragment } from "react";
import { GoDiffAdded } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { FormElementNames } from "../../../../pages/ManagerEditProject";
import {
  addQuestionnaireQstn,
  addQuestionnaireQstnOption,
  changeQuestionnaireHeader,
  changeQuestionnaireQstn,
  changeQuestionnaireQstnOption,
  changeQuestionnaireType,
  removeQuestionnaireQstn,
  removeQuestionnaireQstnOption,
} from "../../../../store/project-edit-slice";
import { QuestionnaireActionPayloadType } from "../../../../store/questionnaire-slice";
import randomHashGenerator from "../../../../utils/random-hash-generator";
import Expandable from "../../../Expandable";
import FormGroup from "../../FormGroup";
import styles from "./styles.module.css";

type QuestionnaireProps = {
  questionnaire: QuestionnaireActionPayloadType;
  phaseIdx: number;
};

export default function Questionnaire({
  questionnaire,
  phaseIdx,
}: QuestionnaireProps) {
  const dispatch = useDispatch();

  const onHeaderChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(
      changeQuestionnaireHeader({ phaseIdx, header: event.target.value })
    );
  };

  const onQstnTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    qstnIdx: number
  ) => {
    dispatch(
      changeQuestionnaireQstn({
        phaseIdx: phaseIdx,
        qstnIdx: qstnIdx,
        qstn: event.target.value,
      })
    );
  };

  const onQstnTypeChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    qstnIdx: number
  ) => {
    dispatch(
      changeQuestionnaireType({
        phaseIdx: phaseIdx,
        qstnIdx: qstnIdx,
        type: event.target.value,
      })
    );
  };

  const addQstnHandler = () => {
    dispatch(addQuestionnaireQstn({ phaseIdx }));
  };

  const removeQstnHandler = (qstnIdx: number) => {
    alert("Are you sure you want to remove question: " + (qstnIdx + 1));
    dispatch(removeQuestionnaireQstn({ phaseIdx, qstnIdx }));
  };

  const onQstnOptionChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    qstnIdx: number,
    optionIdx: number
  ) => {
    dispatch(
      changeQuestionnaireQstnOption({
        qstnIdx,
        optionIdx,
        option: event.target.value,
        phaseIdx,
      })
    );
  };

  const addQstnOptionHandler = (qstnIdx: number) => {
    dispatch(addQuestionnaireQstnOption({ qstnIdx, phaseIdx }));
  };

  const removeQstnOptionHandler = (qstnIdx: number, optionIdx: number) => {
    alert("Are you sure you want to remove option: " + (optionIdx + 1));
    dispatch(removeQuestionnaireQstnOption({ qstnIdx, optionIdx, phaseIdx }));
  };

  return (
    <Expandable title="Questionnaire" uniqueId={"questionnaire" + phaseIdx}>
      <div className={styles.questionnaire}>
        <h3>Questionnaire</h3>
        <FormGroup
          name={FormElementNames.questionnaire_header + phaseIdx}
          label="Header"
          type="text"
          value={questionnaire.header}
          onChange={onHeaderChange}
        />
        <div className={styles.qstns}>
          {questionnaire.qstns.map((qstn, qstnIdx) => {
            const qstnJSX = (
              <Expandable
                uniqueId={"qstn" + qstnIdx + phaseIdx}
                title={`Question ${qstnIdx + 1}`}
                key={qstnIdx}
              >
                <div
                  className={styles.remove}
                  onClick={() => removeQstnHandler(qstnIdx)}
                >
                  <MdDeleteForever /> <p>Remove Question</p>
                </div>
                <div className={styles.qstn} key={qstnIdx}>
                  <FormGroup
                    name={FormElementNames.qstn_type + qstnIdx + phaseIdx}
                    label={"Type"}
                    type="radio"
                    options={["likert", "text", "multiple"]}
                    value={qstn.type}
                    onChange={(e) => onQstnTypeChange(e, qstnIdx)}
                  />

                  <FormGroup
                    name={FormElementNames.qstn + qstnIdx + phaseIdx}
                    label={"Question"}
                    type="textarea"
                    value={qstn.question}
                    onChange={(e) => onQstnTextChange(e, qstnIdx)}
                  />
                  {(qstn.type === "likert" || qstn.type === "multiple") && (
                    <Expandable
                      title="Options"
                      uniqueId={"qstn_options" + qstnIdx + phaseIdx}
                    >
                      <>
                        {qstn.options?.map((option, optionIdx) => {
                          const optionJSX = (
                            <Fragment key={qstnIdx + optionIdx}>
                              <FormGroup
                                name={
                                  FormElementNames.qstn_option +
                                  optionIdx +
                                  qstnIdx +
                                  phaseIdx
                                }
                                label={"Option " + (optionIdx + 1)}
                                type="text"
                                value={option.text}
                                onChange={(e) =>
                                  onQstnOptionChange(e, qstnIdx, optionIdx)
                                }
                              />
                              <div
                                className={styles.remove}
                                onClick={() =>
                                  removeQstnOptionHandler(qstnIdx, optionIdx)
                                }
                              >
                                <MdDeleteForever /> <p>Remove Option</p>
                              </div>
                            </Fragment>
                          );
                          return optionJSX;
                        }) || []}
                        <Fragment key={"optionIdx" + qstnIdx}>
                          <div
                            className={styles.add}
                            key={
                              "optionIdx" + "add option" + randomHashGenerator(3)
                            }
                            onClick={() => addQstnOptionHandler(qstnIdx)}
                          >
                            <GoDiffAdded /> <p>Add Option</p>
                          </div>
                        </Fragment>
                      </>
                    </Expandable>
                  )}
                </div>
              </Expandable>
            );
            if (qstnIdx === questionnaire.qstns.length - 1) {
              return (
                <Fragment key={qstnIdx}>
                  {qstnJSX}
                  <div
                    className={styles.add}
                    key={qstnIdx + "add question"}
                    onClick={addQstnHandler}
                  >
                    <GoDiffAdded /> <p>Add Question</p>
                  </div>
                </Fragment>
              );
            } else {
              return qstnJSX;
            }
          })}
        </div>
      </div>
    </Expandable>
  );
}
