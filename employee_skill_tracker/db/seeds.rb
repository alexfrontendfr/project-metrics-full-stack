require 'faker'

# Create users
5.times do
  user = User.create!(
    email: Faker::Internet.email,
    password: 'password123',
    password_confirmation: 'password123'
  )

  # Create metrics for each user
  20.times do
    user.metrics.create!(
      name: %w[Performance Productivity Quality Satisfaction].sample,
      value: rand(1..100),
      timestamp: Faker::Time.between(from: 30.days.ago, to: Time.now)
    )
  end
end

# Create employees, skills, and training sessions
User.all.each do |user|
  20.times do
    employee = user.employees.create!(
      name: Faker::Name.name,
      department: Faker::Company.industry,
      role: Faker::Job.title,
      start_date: Faker::Date.backward(days: 365)
    )

    skills = []
    3.times do
      skills << employee.skills.create!(
        name: Faker::Job.key_skill,
        proficiency: rand(50..100)
      )
    end

    5.times do
      employee.training_sessions.create!(
        name: Faker::Job.key_skill,
        date: Faker::Date.backward(days: 30),
        skill_id: skills.sample.id
      )
    end
  end
end

# Create metrics
User.all.each do |user|
  100.times do
    user.metrics.create!(
      name: ['Performance', 'Productivity', 'Quality', 'Satisfaction'].sample,
      value: rand(1..100),
      timestamp: Faker::Time.between(from: 30.days.ago, to: Time.now)
    )
  end
end