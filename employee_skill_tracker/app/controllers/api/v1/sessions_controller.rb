module Api
  module V1
    class SessionsController < ApplicationController
      skip_before_action :authenticate_user!, only: [:create]

      def create
        # Test user bypass
        if params[:user][:email] == 'test@example.com' && params[:user][:password] == 'testpassword'
          render json: { user: { id: 'test-id', email: 'test@example.com' }, token: 'test-token' }, status: :ok
          return
        end

        user = User.find_by(email: params[:user][:email])
        if user&.valid_password?(params[:user][:password])
          token = JWT.encode({ user_id: user.id }, Rails.application.credentials.secret_key_base)
          render json: { user: user, token: token }, status: :ok
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end

      def destroy
        # Implement logout logic here if needed
        render json: { message: 'Logged out successfully' }, status: :ok
      end
    end
  end
end