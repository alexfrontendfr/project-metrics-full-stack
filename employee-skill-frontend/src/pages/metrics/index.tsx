import React, { useState, useEffect, useCallback } from "react";
import { Line } from "react-chartjs-2";
import Layout from "../../components/Layout";
import ProtectedRoute from "../../components/ProtectedRoute";
import MetricsTutorial from "../../components/MetricsTutorial";
import api from "../../lib/api";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Metric {
  id: number;
  name: string;
  value: number;
  timestamp: string;
}

interface MetricsResponse {
  metrics: Metric[];
  meta: {
    total_pages: number;
  };
}

interface Averages {
  hourly: Record<string, number>;
  daily: Record<string, number>;
}

export default function Metrics() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [averages, setAverages] = useState<Averages>({ hourly: {}, daily: {} });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newMetric, setNewMetric] = useState({ name: "", value: "" });

  const fetchMetrics = useCallback(async () => {
    try {
      const response = await api.get<MetricsResponse>(
        `/metrics?page=${currentPage}`
      );
      setMetrics(response.data.metrics);
      setTotalPages(response.data.meta.total_pages);
    } catch (error) {
      console.error("Error fetching metrics:", error);
      toast.error("Failed to fetch metrics");
    }
  }, [currentPage]);

  const fetchAverages = useCallback(async () => {
    try {
      const response = await api.get<Averages>("/metrics/averages");
      setAverages(response.data);
    } catch (error) {
      console.error("Error fetching averages:", error);
      toast.error("Failed to fetch averages");
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
    fetchAverages();
  }, [fetchMetrics, fetchAverages]);

  const handleAddMetric = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/metrics", {
        ...newMetric,
        timestamp: new Date().toISOString(),
      });
      toast.success("Metric added successfully!");
      setNewMetric({ name: "", value: "" });
      fetchMetrics();
      fetchAverages();
    } catch (error) {
      console.error("Error adding metric:", error);
      toast.error("Failed to add metric");
    }
  };

  const chartData = {
    labels: metrics.map((metric) =>
      new Date(metric.timestamp).toLocaleString()
    ),
    datasets: [
      {
        label: "Metric Value",
        data: metrics.map((metric) => metric.value),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Metrics Over Time",
      },
    },
  };

  return (
    <ProtectedRoute>
      <Layout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto p-4"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Metrics Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Add New Metric</h2>
              <form onSubmit={handleAddMetric} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Metric Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={newMetric.name}
                    onChange={(e) =>
                      setNewMetric({ ...newMetric, name: e.target.value })
                    }
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="value"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Metric Value
                  </label>
                  <input
                    type="number"
                    id="value"
                    value={newMetric.value}
                    onChange={(e) =>
                      setNewMetric({ ...newMetric, value: e.target.value })
                    }
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Add Metric
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Averages</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Hourly Averages</h3>
                  <ul className="space-y-1">
                    {Object.entries(averages.hourly).map(([hour, value]) => (
                      <li key={hour} className="flex justify-between">
                        <span>{hour}:00</span>
                        <span className="font-semibold">
                          {value.toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Daily Averages</h3>
                  <ul className="space-y-1">
                    {Object.entries(averages.daily).map(([day, value]) => (
                      <li key={day} className="flex justify-between">
                        <span>{day}</span>
                        <span className="font-semibold">
                          {value.toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Metrics Chart</h2>
            <div className="h-96">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </motion.div>
        <MetricsTutorial />
      </Layout>
    </ProtectedRoute>
  );
}
