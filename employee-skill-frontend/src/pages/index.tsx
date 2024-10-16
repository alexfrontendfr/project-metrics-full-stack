import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import axios from "axios";

interface Metric {
  id: number;
  name: string;
  value: number;
}

const HomePage: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/metrics"
        );
        setMetrics(response.data.metrics);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };
    fetchMetrics();
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
            Employee Skill Tracker
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Empower your workforce with our advanced skill management and
            training tracking system. Unlock potential and drive growth.
          </p>
          <div className="space-x-4">
            <Link href="/login">
              <button className="btn-primary bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                Get Started
              </button>
            </Link>
            <Link href="/register">
              <button className="btn-primary bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                Sign Up
              </button>
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
                  {metrics.slice(0, 5).map((metric) => (
                    <li
                      key={metric.id}
                      className="flex justify-between items-center border-b pb-4 last:border-b-0"
                    >
                      <span className="font-medium text-lg text-gray-700">
                        {metric.name}
                      </span>
                      <span className="text-2xl font-bold text-indigo-600">
                        {metric.value}
                      </span>
                    </li>
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
