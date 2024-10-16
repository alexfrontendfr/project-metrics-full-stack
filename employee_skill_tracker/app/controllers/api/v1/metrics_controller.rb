module Api
  module V1
    class MetricsController < ApplicationController
      def index
        @metrics = Metric.includes(:employee)
                         .where(filter_params)
                         .order(timestamp: :desc)
                         .page(params[:page])
                         .per(20)

        render json: {
          metrics: @metrics.as_json(include: { employee: { only: [:id, :name] } }),
          meta: {
            current_page: @metrics.current_page,
            total_pages: @metrics.total_pages,
            total_count: @metrics.total_count
          }
        }
      end

      def create
        @metric = current_user.metrics.new(metric_params)
        if @metric.save
          render json: @metric, status: :created
        else
          render json: @metric.errors, status: :unprocessable_entity
        end
      end

      private

      def metric_params
        params.require(:metric).permit(:name, :value, :timestamp, :employee_id)
      end

      def filter_params
        filters = {}
        filters[:employee_id] = params[:employee_id] if params[:employee_id].present?
        filters[:timestamp] = params[:start_date]..params[:end_date] if params[:start_date].present? && params[:end_date].present?
        filters
      end
    end
  end
end