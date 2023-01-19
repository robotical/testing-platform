const getFrequency = (arr: string[]) => arr.reduce((freq, item) => {
    freq[item] = (freq[item] || 0) + 1;
    return freq;
}, {} as { [key: string]: number });

export default getFrequency;