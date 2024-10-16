import React, { useState, useEffect } from "react";
import api from "../lib/api";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface Skill {
  name: string;
  value: number;
}

interface EmployeeSkillsProps {
  employeeId: number | null;
}

const EmployeeSkills: React.FC<EmployeeSkillsProps> = ({ employeeId }) => {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchEmployeeSkills = async () => {
      if (employeeId) {
        try {
          const response = await api.get(`/employees/${employeeId}/skills`);
          setSkills(response.data);
        } catch (error) {
          console.error("Error fetching employee skills:", error);
        }
      }
    };

    fetchEmployeeSkills();
  }, [employeeId]);

  const chartData = {
    labels: Array.isArray(skills) ? skills.map((skill) => skill.name) : [],
    datasets: [
      {
        label: "Skill Level",
        data: Array.isArray(skills) ? skills.map((skill) => skill.name) : [], // Ensure skills is an array
      },
    ],
  };

  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  if (!employeeId) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Employee Skills Overview</h2>
      <div style={{ height: "400px" }}>
        <Radar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default EmployeeSkills;
