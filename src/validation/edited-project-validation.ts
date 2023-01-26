import DatabaseManager from "../db/DatabaseManager";
import { ProjectDbType } from "../interfaces/project";

export default async function validateFullProject(
  project: ProjectDbType,
  shouldValidateName: boolean,
): Promise<{ error: string }[]> {
  const errors = [];
  // validate name
  // name validation only when we are creating a new project, not when we are editing
  shouldValidateName && errors.push(...(await validateName(project.name)));
  // validate url
  errors.push(...validateUrl(project.url));
  // validate phases
  errors.push(...validatePhases(project.phases));
  // validate instructions
  errors.push(...validateInstructions(project.phases));
  // validate messages
  errors.push(...validateMsgs(project.phases));
  // validate questionnaire
  errors.push(...validateQuestionnaire(project.phases));
  // validate questions
  errors.push(...validateQstn(project.phases));
  // validate options
  errors.push(...validateOptions(project.phases));
  return errors;
}

export async function validateName(name: string) {
  // search in db if name is unique
  const errors = [];
  try {
    const { projectNames } = await DatabaseManager.getProjects();
    if (projectNames.includes(name)) {
      errors.push({ error: `Project name: ${name} already exists` });
    }
  } catch (error) {
    errors.push({
      error: `Error trying to communicate with db --please try again`,
    });
  }
  return errors;
}

export function validateUrl(url: string) {
  const errors = [];
  const validUrl = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(validUrl);
  // validate url
  if (url === "") {
    errors.push({ error: `Url cannot be empty` });
  } else if (!url.match(regex)) {
    errors.push({ error: `Url is not valid: ${url}` });
  }
  return errors;
}

export function validatePhases(phases: ProjectDbType["phases"]) {
  // validate phases
  const errors = [];
  if (phases.length === 0) {
    errors.push( { error: `There should be at least one phase` });
  }
  return errors;
}

export function validateInstructions(phases: ProjectDbType["phases"]) {
  // validate instructions
  const errors = [];
  for (let i = 0; i < phases.length; i++) {
    const phase = phases[i];
    if (phase.instructions.header === "") {
      errors.push( { error: `Phase ${i+1} instructions header cannot be empty` });
    }
    if (phase.instructions.msgs.length === 0) {
      errors.push( { error: `Phase ${i+1} instructions should have at least one message` });
    }
  }
  return errors;
}

export function validateMsgs(phases: ProjectDbType["phases"]) {
  // validate msgs
  const errors = [];
  for  (let i = 0; i < phases.length; i++) {
    const phase = phases[i];
    for (let m = 0; m < phase.instructions.msgs.length; m++) {
      const msg = phase.instructions.msgs[m];
      if (msg.msg === "") {
        errors.push( { error: `Phase ${i+1}, msg ${m+1} Message cannot be empty` });
      }
    }
  }
  return errors;
}

export function validateQuestionnaire(phases: ProjectDbType["phases"]) {
  // validate questionnaire
  const errors = [];
  for  (let i = 0; i < phases.length; i++) {
    const phase = phases[i];
    if (phase.questionnaire.header === "") {
      errors.push( { error: `Phase ${i+1} questionnaire header cannot be empty` });
    }
    if (phase.questionnaire.qstns.length === 0) {
      errors.push( { error: `Phase ${i+1} questionnaire should have at least one question` });
    }
  }
  return errors;
}

export function validateQstn(phases: ProjectDbType["phases"]) {
  // validate qstn
  const errors = [];
  for  (let i = 0; i < phases.length; i++) {
    const phase = phases[i];
    for (let q = 0; q < phase.questionnaire.qstns.length; q++) {
      const qstn = phase.questionnaire.qstns[q];
      if (qstn.question === "") {
        errors.push( { error: `Phase ${i+1}, question ${q+1} cannot be empty` });
      }
      if (qstn.type === "likert" || qstn.type === "multiple") {
        if (!qstn.options || qstn.options.length === 0) {
          errors.push( { error: `Phase ${i+1 }, likert/multiple-choice question ${q+1} should have at least one option` });
        }
      }
    }
  }
  return errors;
}

export function validateOptions(phases: ProjectDbType["phases"]) {
  // validate options
  const errors = [];
  for  (let i = 0; i < phases.length; i++) {
    const phase = phases[i];
    for (let q = 0; q < phase.questionnaire.qstns.length; q++) {
      const qstn = phase.questionnaire.qstns[q];
      if (qstn.type === "likert" || qstn.type === "multiple") {
        if (!qstn.options || qstn.options.length === 0) {
          continue;
        }
        for (let o = 0; o < qstn.options.length; o++) {
          const option = qstn.options[o];
          if (option.text === "") {
            errors.push({ error: `Phase ${i+1} question ${q+1} option ${o+1} option cannot be empty` });
          }
        }
      }
    }
  }
  return errors;
}
