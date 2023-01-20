import { useState } from "react";
import { AnswerType } from "../../../interfaces/answers";
import { DbProject } from "../../../interfaces/sessions";
import { QuestionnaireActionPayloadType } from "../../../store/questionnaire-slice";
import { stringAnswerToArray } from "../../../utils/plot/answers-transformations";
import PlotData from "../PlotData";
import styles from "./styles.module.css";

export type IndividualSessionsProps = {
  project: DbProject;
};

export default function IndividualSessions({
  project,
}: IndividualSessionsProps) {
  const [selectedSession, setSelectedSession] = useState<string>();
  const [expandedPhases, setExpandedPhases] = useState<string[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<string>();
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerType>();

  const handleSelectSession = (sessionId: string) => {
    setSelectedSession(sessionId);
    setExpandedPhases([]);
  };

  const handleSelectPhase = (phaseId: string) => {
    if (expandedPhases.includes(phaseId)) {
      setExpandedPhases(expandedPhases.filter((id) => id !== phaseId));
    } else {
      setExpandedPhases([...expandedPhases, phaseId]);
    }
  };

  const handleSelectQuestion = (
    sessionString: string,
    phaseIndex: number,
    questionIndex: number,
    questionnaire: QuestionnaireActionPayloadType
  ) => {
    const questionId = `${sessionString}-${phaseIndex}-${questionIndex}`;
    setSelectedQuestion(questionId);
    if (questionnaire.answers) {
      // transform answers to plot data
      const plotData = stringAnswerToArray(questionnaire.answers[questionIndex]);
      setSelectedAnswer(plotData);
    }
  };

  return (
    <>
      <div className={styles.dashboard}>
        <div className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Sessions</h2>
          {Object.keys(project).map((sessionId) => (
            <button
              key={sessionId}
              className={`${styles.sessionButton} ${
                sessionId === selectedSession ? styles.selected : ""
              }`}
              onClick={() => handleSelectSession(sessionId)}
            >
              {sessionId}
            </button>
          ))}
        </div>
        <div className={styles.main}>
          {selectedSession && (
            <>
              <h2 className={styles.mainTitle}>
                {selectedSession} duration to complete: {project[selectedSession].durationInMins.toFixed(2)} mins
              </h2>
              {project[selectedSession].phases.map((phase, index) => (
                <div key={index}>
                  <button
                    className={`${styles.phaseButton} ${
                      expandedPhases.includes(
                        `${selectedSession}-phase-${index}`
                      )
                        ? styles.expanded
                        : ""
                    }`}
                    onClick={() =>
                      handleSelectPhase(`${selectedSession}-phase-${index}`)
                    }
                  >
                    Phase {index + 1}
                  </button>
                  {expandedPhases.includes(
                    `${selectedSession}-phase-${index}`
                  ) && (
                    <div className={styles.questions}>
                      {phase.questionnaire.qstns.map((question, qIndex) => (
                        <button
                          key={qIndex}
                          className={`${styles.questionButton} ${
                            `${selectedSession}-${index}-${qIndex}` ===
                            selectedQuestion
                              ? styles.selected
                              : ""
                          }`}
                          onClick={() =>
                            handleSelectQuestion(
                              selectedSession,
                              index,
                              qIndex,
                              phase.questionnaire
                            )
                          }
                        >
                          {qIndex + 1}) {question.question}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className={styles.data_area}>
        {selectedAnswer && <PlotData answerData={selectedAnswer} />}
      </div>
    </>
  );
}
