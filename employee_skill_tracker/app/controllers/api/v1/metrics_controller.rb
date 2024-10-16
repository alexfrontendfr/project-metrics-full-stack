module Api
  module V1
    class MetricsController < ApplicationController
      before_action :authenticate_user!  # Ensure user is authenticated before actions

      def index
        @metrics = current_user.metrics.order(timestamp: :desc).page(params[:page]).per(20)
        render json: {
          metrics: @metrics,
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

      def averages
        start_date = params[:start_date] || 7.days.ago
        end_date = params[:end_date] || Time.current

        hourly_averages = current_user.metrics.where(timestamp: start_date..end_date)
                                .group_by_hour(:timestamp)
                                .average(:value)

        daily_averages = current_user.metrics.where(timestamp: start_date..end_date)
                               .group_by_day(:timestamp)
                               .average(:value)

        render json: {
          hourly: hourly_averages,
          daily: daily_averages
        }
      end

      private

      def metric_params
        params.require(:metric).permit(:name, :value, :timestamp)
      end
    end
  end
end
