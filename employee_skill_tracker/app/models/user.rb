class User < ApplicationRecord
    devise :database_authenticatable, :registerable,
           :recoverable, :rememberable, :validatable,
           :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist
  
    has_many :metrics, dependent: :destroy
    has_many :employees, dependent: :destroy
  end