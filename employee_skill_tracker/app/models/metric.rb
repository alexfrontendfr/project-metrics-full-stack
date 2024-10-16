class Metric < ApplicationRecord
  belongs_to :user
  belongs_to :employee

  validates :name, presence: true
  validates :value, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }
  validates :timestamp, presence: true
end