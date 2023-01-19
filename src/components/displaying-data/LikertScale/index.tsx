import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { QuestionOptionsType } from "../../../store/questionnaire-slice";
import getFrequency from "../../../utils/array/get-frequency";
import DEFAULT_OPTIONS from "../../../utils/likert-fallback-values";

interface Props {
  categories: QuestionOptionsType[] | undefined;
  answers: string[];
  title: string;
}

const BarGraph: React.FC<Props> = ({ categories, title, answers }) => {
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
    const answersFreq = getFrequency(answers);
    // transform frequency object to array with the same order as the categories
    let plotAnswers = plotCategories.map((category) => answersFreq[category] || 0);

    setData({
      type: "bar",
      x: plotCategories,
      y: plotAnswers,
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