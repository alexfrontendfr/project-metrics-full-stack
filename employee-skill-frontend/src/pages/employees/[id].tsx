// src/pages/employees/[id].tsx

import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import EmployeeSkills from "../../components/EmployeeSkills";
import ProtectedRoute from "../../components/ProtectedRoute";
import api from "../../lib/api";
import { motion } from "framer-motion";

interface Skill {
  id: number;
  name: string;
  proficiency: number;
}

interface Employee {
  id: number;
  name: string;
  department: string;
  role: string;
  skills: Skill[];
}

interface EmployeeDetailsProps {
  employee: Employee | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  try {
    const response = await api.get<Employee>(`/employees/${id}`);
    return { props: { employee: response.data } };
  } catch (error) {
    console.error("Error fetching employee:", error);
    return { props: { employee: null } };
  }
};

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({ employee }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!employee) {
    return (
      <Layout>
        <div className="text-center text-red-500">
          Error loading employee details. Please try again later.
        </div>
      </Layout>
    );
  }

  return (
    <ProtectedRoute>
      <Layout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto p-4"
        >
          <h1 className="text-3xl font-bold mb-4">{employee.name}</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="mb-2">
              <span className="font-semibold">Department:</span>{" "}
              {employee.department}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Role:</span> {employee.role}
            </p>
          </div>

          <EmployeeSkills skills={employee.skills} />
        </motion.div>
      </Layout>
    </ProtectedRoute>
  );
};

export default EmployeeDetails;
