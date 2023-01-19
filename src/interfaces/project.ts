import { DialogActionPayloadType } from "../store/dialog-slice";
import { QuestionnaireActionPayloadType } from "../store/questionnaire-slice";

export type PhaseType = {
    instructions: DialogActionPayloadType;
    questionnaire: QuestionnaireActionPayloadType;
};

export type ProjectDbType = {
    id: string;
    name: string;
    description: string;
    url: string;
    phases: PhaseType[];
};
