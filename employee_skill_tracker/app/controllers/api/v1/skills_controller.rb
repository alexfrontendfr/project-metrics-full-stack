module Api
  module V1
    class SkillsController < ApplicationController
      def create
        employee = Employee.find_by(id: params[:employee_id])
        if employee.nil?
          return render json: { error: 'Employee not found' }, status: :not_found
        end
        skill = employee.skills.new(skill_params)
        if skill.save
          render json: skill, status: :created
        else
          render json: skill.errors, status: :unprocessable_entity
        end
      end

      def update
        skill = Skill.find_by(id: params[:id])
        if skill.nil?
          return render json: { error: 'Skill not found' }, status: :not_found
        end
        if skill.update(skill_params)
          render json: skill
        else
          render json: skill.errors, status: :unprocessable_entity
        end
      end

      private

      def skill_params
        params.require(:skill).permit(:name, :level, :category)
      end
    end
  end
end
