import React from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import api from "../../lib/api";
import Layout from "../../components/Layout";

interface Employee {
  id: number;
  name: string;
}

interface EmployeesProps {
  employees: Employee[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await api.get("/employees");
    return { props: { employees: res.data } };
  } catch (error) {
    console.error("Error fetching employees:", error);
    return { props: { employees: [] } };
  }
};

const Employees: React.FC<EmployeesProps> = ({ employees }) => {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Employees</h1>
        {employees.length === 0 ? (
          <p className="text-center">No employees available at the moment.</p>
        ) : (
          <ul className="space-y-2">
            {employees.map((employee) => (
              <li key={employee.id} className="p-4 border rounded shadow">
                <Link
                  href={`/employees/${employee.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {employee.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default Employees;
