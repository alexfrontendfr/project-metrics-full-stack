class Employee < ApplicationRecord
  belongs_to :user
  has_many :skills, dependent: :destroy
  has_many :training_sessions, dependent: :destroy
  has_many :metrics, through: :user

  def skill_gap
    required_skills = Skill.where(role: self.role)
    missing_skills = required_skills - self.skills
    missing_skills
  end
end