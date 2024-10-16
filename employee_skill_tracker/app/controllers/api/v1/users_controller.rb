module Api
  module V1
    class UsersController < ApplicationController
      skip_before_action :authenticate_user!, only: [:create]

      def create
        @user = User.new(user_params)
        if @user.save
          token = JWT.encode({ user_id: @user.id }, Rails.application.credentials.secret_key_base)
          render json: { user: @user.as_json(only: [:id, :email]), token: token }, status: :created
        else
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def current
        render json: { user: current_user.as_json(only: [:id, :email]) }, status: :ok
      end

      private

      def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
      end
    end
  end
end