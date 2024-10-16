// src/components/EmployeeSkills.tsx

import React from "react";
import { motion } from "framer-motion";

interface Skill {
  id: number;
  name: string;
  proficiency: number;
}

interface EmployeeSkillsProps {
  skills: Skill[];
}

const EmployeeSkills: React.FC<EmployeeSkillsProps> = ({ skills }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Skills</h2>
      {skills.length === 0 ? (
        <p>No skills available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                      Proficiency
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      {skill.proficiency}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                  <div
                    style={{ width: `${skill.proficiency}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeSkills;
