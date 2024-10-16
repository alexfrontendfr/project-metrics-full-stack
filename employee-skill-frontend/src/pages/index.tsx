import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import api from "../lib/api";

interface Metric {
  id: number;
  name: string;
  value: number;
  employee_name: string;
  timestamp: string;
}

const HomePage: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await api.get("/metrics?limit=5");
        setMetrics(response.data.metrics);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };
    fetchMetrics();

    const interval = setInterval(fetchMetrics, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 py-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-indigo-600">
            <Typewriter
              words={["Empower", "Innovate", "Engage"]}
              loop={false}
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Empower your workforce with our advanced skill management and
            training tracking system. Unlock potential and drive growth.
          </p>
          <div className="space-x-4">
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                Get Started
              </motion.button>
            </Link>
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                Sign Up
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <div className="metrics-preview py-20 bg-gray-50 rounded-xl shadow-inner">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10 text-indigo-600">
              Live Metrics Overview
            </h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              {metrics.length > 0 ? (
                <ul className="space-y-6">
                  {metrics.map((metric) => (
                    <motion.li
                      key={metric.id}
                      className="flex justify-between items-center border-b pb-4 last:border-b-0"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div>
                        <span className="font-medium text-lg text-gray-700">
                          {metric.employee_name}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">
                          {metric.name}
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <motion.span
                          className="text-2xl font-bold text-indigo-600"
                          key={metric.value}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {metric.value}
                        </motion.span>
                        <span className="text-sm text-gray-500">
                          {new Date(metric.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500 text-lg">
                  No metrics available for preview.
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
