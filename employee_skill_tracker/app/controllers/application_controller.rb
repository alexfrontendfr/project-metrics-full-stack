class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  private

  def authenticate_user!
    return if request.path == '/api/v1/login' || request.path == '/api/v1/users'
    
    if request.headers['Authorization'].present?
      jwt_payload = JWT.decode(request.headers['Authorization'].split(' ').last, Rails.application.credentials.secret_key_base).first
      @current_user_id = jwt_payload['user_id']
    else
      render json: { error: 'Not Authorized' }, status: :unauthorized
    end
  rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError
    render json: { error: 'Not Authorized' }, status: 401
  end

  def current_user
    @current_user ||= User.find(@current_user_id) if @current_user_id
  end
end