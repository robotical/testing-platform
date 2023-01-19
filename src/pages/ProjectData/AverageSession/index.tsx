import { useState } from "react";
import { DbProject } from "../../../interfaces/sessions";

interface AverageSessionDashboardProps {
    project: DbProject;
  }
  
  export default function AverageSessionDashboard ({ project }:AverageSessionDashboardProps)  {
    const [expandedPhases, setExpandedPhases] = useState<number[]>([]);
  
    const handleSelectPhase = (phaseIndex: number) => {
      if (expandedPhases.includes(phaseIndex)) {
        setExpandedPhases(expandedPhases.filter((i) => i !== phaseIndex));
      } else {
        setExpandedPhases([...expandedPhases, phaseIndex]);
      }
    };
  
    return (
      <div className="dashboard">
        <div className="sidebar">
          <h3 className="sidebarTitle">Average Session</h3>
          {project[Object.keys(project)[0]].phases.map((phase, index) => (
            <button
              key={index}
              className={`phaseButton ${expandedPhases.includes(index) && 'expanded'}`}
              onClick={() => handleSelectPhase(index)}
            >
              Phase {index + 1}
            </button>
          ))}
        </div>
        <div className="main">
          {expandedPhases.map((phaseIndex) => (
            <div key={phaseIndex} className="questions">
              <h4 className="phaseTitle">Phase {phaseIndex + 1}</h4>
              {project[Object.keys(project)[0]].phases[phaseIndex].questionnaire.qstns.map((question, index) => (
                <div key={index} className="questionContent">
                  {/* render question */}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };
  