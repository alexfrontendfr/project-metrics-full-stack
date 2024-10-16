module Api
  module V1
    class SessionsController < ApplicationController
      skip_before_action :authenticate_user!, only: [:create]

      def create
        user = User.find_by(email: params[:user][:email])
        if user && user.valid_password?(params[:user][:password])
          token = JWT.encode({ user_id: user.id }, Rails.application.credentials.secret_key_base)
          render json: { user: user.as_json(only: [:id, :email]), token: token }, status: :ok
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end

      def destroy
        render json: { message: 'Logged out successfully' }, status: :ok
      end
    end
  end
end
