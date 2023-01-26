import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { QuestionOptionsType } from "../../../store/questionnaire-slice";
import { getFrequencyOfAnswers } from "../../../utils/array/get-frequency";
import DEFAULT_OPTIONS from "../../../utils/likert-fallback-values";

interface Props {
  categories: QuestionOptionsType[] | undefined;
  answers: string[];
  title: string;
  sessionIds: string[];
}

const BarGraph: React.FC<Props> = ({ categories, title, answers, sessionIds }) => {
  const [data, setData] = useState({});


  useEffect(() => {
    // transform categories to string array
    let plotCategories;
    if (categories) {
        plotCategories = categories.map((category) => category.text);
    } else {
        // if no categories, use fallback values
        plotCategories = DEFAULT_OPTIONS.map((category) => category.text);
    }
    
    // transform answers to frequency object
    const answersFreq = getFrequencyOfAnswers(answers, sessionIds);
    // transform frequency object to array with the same order as the categories
    const plotAnswers = plotCategories.map((category) => answersFreq[category]?.freq || 0);
    const plotText = plotCategories.map((category) => answersFreq[category]?.sessionIds.join("<br>") || []);

    setData({
      type: "bar",
      x: plotCategories,
      y: plotAnswers,
      text: plotText,
      textposition: "none",
      name: "Answers",
      marker: {
        color: "#4285f4",
        line: {
          width: 1.5,
          color: "white",
        },
      },
    });
  }, [categories, answers]);

  return (
    <div className="bar-graph">
      <Plot
        data={[data]}
        layout={{
          title: title,
          xaxis: {
            title: "Categories",
          },
          yaxis: {
            title: "Answers",
          },
        }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
};

export default BarGraph;