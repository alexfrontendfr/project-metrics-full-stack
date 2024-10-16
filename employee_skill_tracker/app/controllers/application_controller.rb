class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token, if: :json_request?
  before_action :set_csrf_cookie
  before_action :authenticate_user!

  private

  def json_request?
    request.format.json? || request.path.start_with?('/api/')
  end

  def set_csrf_cookie
    cookies['CSRF-TOKEN'] = form_authenticity_token if json_request?
  end

  def authenticate_user!
    return if request.path == '/api/v1/login' || request.path == '/api/v1/register'

    if request.headers['Authorization'].present?
      begin
        jwt_payload = JWT.decode(request.headers['Authorization'].split(' ').last, Rails.application.credentials.secret_key_base).first
        @current_user_id = jwt_payload['user_id']
        @current_user = User.find(@current_user_id)
      rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError, ActiveRecord::RecordNotFound
        render json: { error: 'Not Authorized' }, status: :unauthorized
      end
    else
      render json: { error: 'Not Authorized' }, status: :unauthorized
    end
  end

  def current_user
    @current_user ||= User.find(@current_user_id) if @current_user_id
  end
end
