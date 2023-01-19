export default function getFrequency(
  arr: string[]
): { [key: string]: number } {
  const frequency: { [key: string]: number } = {};
  arr.forEach((element) => {
    if (frequency[element] === undefined) {
      frequency[element] = 1;
    } else {
      frequency[element] += 1;
    }
  });
  return frequency;
}
