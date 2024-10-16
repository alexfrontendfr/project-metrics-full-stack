module Api
  module V1
    class EmployeesController < ApplicationController
      def index
        @employees = Employee.all
        render json: @employees
      end

      def show
        @employee = Employee.find(params[:id])
        render json: @employee, include: [:skills, :training_sessions]
      end

      def top_performers
        @top_employees = Employee.joins(:metrics)
                                 .select('employees.*, AVG(metrics.value) as performance')
                                 .group('employees.id')
                                 .order('performance DESC')
                                 .limit(5)
        render json: @top_employees
      end

      def skills
        employee = Employee.find(params[:id])
        # Logic to retrieve employee's skills
        render json: { skills: employee.skills }
      end

      private

      def employee_params
        params.require(:employee).permit(:name, :department, :role, :start_date)
      end
    end
  end
end
