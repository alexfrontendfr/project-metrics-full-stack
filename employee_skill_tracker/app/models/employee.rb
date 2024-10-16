class Employee < ApplicationRecord
    has_many :skills, dependent: :destroy
    has_many :training_sessions, dependent: :destroy
  
    def skill_gap
      required_skills = Skill.where(role: self.role)
      missing_skills = required_skills - self.skills
      missing_skills
    end
  end