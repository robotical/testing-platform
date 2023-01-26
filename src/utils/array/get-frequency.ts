export default function getFrequency(
  arr1: string[],
  arr2: string[]
): { [key: string]: number } {
  const frequency: { [key: string]: number } = {};
  arr1.forEach((element) => {
    if (frequency[element] === undefined) {
      frequency[element] = 1;
    } else {
      frequency[element] += 1;
    }
  });
  return frequency;
}

type Frequency = { [key: string]: { freq: number; sessionIds: string[] } };
export function getFrequencyOfAnswers(
  answers: string[],
  sessionIds: string[]
): Frequency {
  const frequency: Frequency = {};
  answers.forEach((answer, index) => {
    if (frequency[answer] === undefined) {
      frequency[answer] = { freq: 1, sessionIds: [sessionIds[index]] };
    } else {
      frequency[answer].freq += 1;
      frequency[answer].sessionIds.push(sessionIds[index]);
    }
  });
  return frequency;
}
