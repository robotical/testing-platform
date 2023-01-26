import { DbProject } from "../interfaces/sessions";

// given a DbProject, return the average session of DbProject sessions in a DbProject object
function transformProject(project: DbProject): DbProject {
  const sessionIds = Object.keys(project);
  let totalDuration = 0;
  for (const sessionId of sessionIds) {
    const session = project[sessionId];
    totalDuration += session.durationInMins;
  }
  const averageDuration = totalDuration / sessionIds.length;

  const averageSession: DbProject = JSON.parse(JSON.stringify(project));

  // remove all keys but the first from averageSession
  for (const sessionId of sessionIds) {
    if (sessionId !== sessionIds[0]) {
      delete averageSession[sessionId];
    }
  }

  // rename the key of the first key to "average"
  const averageSessionId = sessionIds[0];
  averageSession["average"] = averageSession[averageSessionId];
  delete averageSession[averageSessionId];

  // set the duration of the average session to the average duration
  averageSession["average"].durationInMins = averageDuration;

  // remove all answers from the average session
  const avgSession = averageSession["average"];
  avgSession.phases.forEach((phase) => {
    phase.questionnaire.answers?.forEach((answer) => {
      answer.answer = [];
      answer.sessionId = [];
    });
  });

  // concatenate all the answers from all the sessions into the average session
  for (const sessionId of sessionIds) {
    const session = project[sessionId];
    session.phases.forEach((phase, phaseIndex) => {
      phase.questionnaire.answers?.forEach((answer, answerIndex) => {
        averageSession["average"].phases[phaseIndex].questionnaire.answers![
          answerIndex
        ].answer = averageSession["average"].phases[
          phaseIndex
        ].questionnaire.answers![answerIndex].answer.concat(
          answer.answer as string
        );

        if (typeof answer.answer === "object") {
          answer.answer.forEach((answ) => {
            averageSession["average"].phases[phaseIndex].questionnaire.answers![
              answerIndex
            ].sessionId = averageSession["average"].phases[
              phaseIndex
            ].questionnaire.answers![answerIndex].sessionId.concat(
              answer.sessionId as string
            );
          });
        } else {
          averageSession["average"].phases[phaseIndex].questionnaire.answers![
            answerIndex
          ].sessionId = averageSession["average"].phases[
            phaseIndex
          ].questionnaire.answers![answerIndex].sessionId.concat(
            answer.sessionId as string
          );
        }
      });
    });
  }

  return averageSession;
}

export default transformProject;
