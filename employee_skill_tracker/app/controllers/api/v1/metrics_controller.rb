module Api
  module V1
    class MetricsController < ApplicationController
      skip_before_action :authenticate_user!, only: [:index, :averages]

      def index
        @metrics = Metric.order(timestamp: :desc).page(params[:page]).per(20)
        render json: {
          metrics: @metrics,
          meta: {
            current_page: @metrics.current_page,
            total_pages: @metrics.total_pages,
            total_count: @metrics.total_count
          }
        }
      end

      def averages
        start_date = params[:start_date] || 7.days.ago
        end_date = params[:end_date] || Time.current

        hourly_averages = Metric.where(timestamp: start_date..end_date)
                                .group_by_hour(:timestamp)
                                .average(:value)

        daily_averages = Metric.where(timestamp: start_date..end_date)
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