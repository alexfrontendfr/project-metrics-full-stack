class TrainingSessionsController < ApplicationController
  def create
    employee = Employee.find(params[:employee_id])
    training_session = employee.training_sessions.new(training_session_params)
    if training_session.save
      render json: training_session, status: :created
    else
      render json: training_session.errors, status: :unprocessable_entity
    end
  end

  def update
    training_session = TrainingSession.find(params[:id])
    if training_session.update(training_session_params)
      render json: training_session
    else
      render json: training_session.errors, status: :unprocessable_entity
    end
  end

  def destroy
    training_session = TrainingSession.find(params[:id])
    training_session.destroy
    head :no_content
  end

  private

  def training_session_params
    params.require(:training_session).permit(:name, :date, :skill_id)
  end
end