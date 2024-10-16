import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MetricsTutorial: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const steps = [
    {
      title: "View Metrics",
      content:
        "The main chart displays your metrics over time. Use the pagination controls to navigate through your data.",
    },
    {
      title: "Add New Metrics",
      content:
        'Click the "Add New Metric" button to record new data points. Fill in the name, value, and timestamp for each metric.',
    },
    {
      title: "Analyze Averages",
      content:
        'Check the "Hourly Averages" and "Daily Averages" sections to get insights into your metric trends.',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-500 via-green-400 to-blue-600 text-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4">Metrics Tutorial</h2>
          {steps.map((step, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p>{step.content}</p>
            </div>
          ))}
          <button
            onClick={() => setIsOpen(false)}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg mt-4 hover:bg-gray-100"
          >
            Got it!
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MetricsTutorial;
