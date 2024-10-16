import React, { useState, useEffect, useMemo } from "react";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Layout from "../../components/Layout";
import MetricsTutorial from "../../components/MetricsTutorial";
import EmployeeSkills from "../../components/EmployeeSkills";
import api from "../../lib/api";
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
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

interface Metric {
  id: number;
  name: string;
  value: number;
  timestamp: string;
  employee_id: number;
  employee: {
    id: number;
    name: string;
  };
}

interface Employee {
  id: number;
  name: string;
  performance: number;
}

const skills = [
  "Productivity",
  "Quality",
  "Communication",
  "Leadership",
  "Technical Skills",
  "Problem Solving",
  "Teamwork",
  "Adaptability",
  "Time Management",
  "Creativity",
];

export default function Metrics() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [newMetric, setNewMetric] = useState({
    name: "",
    value: "",
    employee_id: "",
  });
  const [topEmployees, setTopEmployees] = useState<Employee[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [endDate, setEndDate] = useState(new Date());
  const [showTutorial, setShowTutorial] = useState(true);

  useEffect(() => {
    fetchMetrics();
    fetchTopEmployees();
    fetchEmployees();
  }, [selectedEmployee, startDate, endDate]);

  const fetchMetrics = async () => {
    try {
      const response = await api.get("/metrics", {
        params: {
          employee_id: selectedEmployee,
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
        },
      });
      setMetrics(response.data.metrics);
    } catch (error) {
      console.error("Error fetching metrics:", error);
      toast.error("Failed to fetch metrics");
    }
  };

  const fetchTopEmployees = async () => {
    try {
      const response = await api.get("/employees/top_performers");
      setTopEmployees(response.data);
    } catch (error) {
      console.error("Error fetching top employees:", error);
      toast.error("Failed to fetch top employees");
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Failed to fetch employees");
    }
  };

  const handleAddMetric = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/metrics", {
        metric: {
          ...newMetric,
          timestamp: new Date().toISOString(),
        },
      });
      toast.success("Metric added successfully!");
      setNewMetric({ name: "", value: "", employee_id: "" });
      fetchMetrics();
    } catch (error) {
      console.error("Error adding metric:", error);
      toast.error("Failed to add metric");
    }
  };

  const chartData = useMemo(() => {
    const groupedMetrics = metrics.reduce((acc, metric) => {
      if (!acc[metric.name]) {
        acc[metric.name] = [];
      }
      acc[metric.name].push(metric);
      return acc;
    }, {} as Record<string, Metric[]>);

    return {
      datasets: Object.entries(groupedMetrics).map(([name, metrics]) => ({
        label: name,
        data: metrics.map((metric) => ({
          x: new Date(metric.timestamp),
          y: metric.value,
        })),
        fill: false,
        borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
        tension: 0.1,
      })),
    };
  }, [metrics]);

  const chartOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Employee Skills Over Time",
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Skill Level",
        },
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Metrics Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add New Metric</h2>
            <form onSubmit={handleAddMetric} className="space-y-4">
              <div>
                <label
                  htmlFor="employee"
                  className="block text-sm font-medium text-gray-700"
                >
                  Employee
                </label>
                <select
                  id="employee"
                  value={newMetric.employee_id}
                  onChange={(e) =>
                    setNewMetric({ ...newMetric, employee_id: e.target.value })
                  }
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="">Select an employee</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Skill
                </label>
                <select
                  id="name"
                  value={newMetric.name}
                  onChange={(e) =>
                    setNewMetric({ ...newMetric, name: e.target.value })
                  }
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="">Select a skill</option>
                  {skills.map((skill) => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="value"
                  className="block text-sm font-medium text-gray-700"
                >
                  Value (1-100)
                </label>
                <input
                  type="number"
                  id="value"
                  min="1"
                  max="100"
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
            <h2 className="text-xl font-semibold mb-4">
              Top Performing Employees
            </h2>
            {topEmployees.length > 0 ? (
              <ul className="space-y-2">
                {topEmployees.map((employee) => (
                  <li
                    key={employee.id}
                    className="flex justify-between items-center"
                  >
                    <span>{employee.name}</span>
                    <span className="font-semibold">
                      {employee.performance.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No top performers data available.</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Metrics Chart</h2>
          <div className="flex space-x-4 mb-4">
            <div>
              <label
                htmlFor="employee-filter"
                className="block text-sm font-medium text-gray-700"
              >
                Filter by Employee
              </label>
              <select
                id="employee-filter"
                value={selectedEmployee || ""}
                onChange={(e) =>
                  setSelectedEmployee(Number(e.target.value) || null)
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">All Employees</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="start-date"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <DatePicker
                id="start-date"
                selected={startDate}
                onChange={(date: Date | null) => date && setStartDate(date)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label
                htmlFor="end-date"
                className="block text-sm font-medium text-gray-700"
              >
                End Date
              </label>
              <DatePicker
                id="end-date"
                selected={endDate}
                onChange={(date: Date | null) => date && setEndDate(date)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
          <div style={{ height: "400px" }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        <EmployeeSkills employeeId={selectedEmployee} />
      </div>
      {showTutorial && (
        <MetricsTutorial onClose={() => setShowTutorial(false)} />
      )}
    </Layout>
  );
}
