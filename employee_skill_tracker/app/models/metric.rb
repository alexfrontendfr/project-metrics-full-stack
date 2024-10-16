class Metric < ApplicationRecord
    belongs_to :user
  
    validates :name, presence: true
    validates :value, presence: true, numericality: true
    validates :timestamp, presence: true
  end