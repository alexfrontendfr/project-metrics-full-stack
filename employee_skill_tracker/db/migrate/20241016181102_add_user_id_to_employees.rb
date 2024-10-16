class AddUserIdToEmployees < ActiveRecord::Migration[7.2]
  def up
    add_reference :employees, :user, foreign_key: true, null: true

    # Bypass the check for a default user and allow null values for existing employees
    Employee.update_all(user_id: nil) # Set user_id to nil for all existing records
    
    # We won't add the `NOT NULL` constraint to avoid issues with existing data
  end

  def down
    remove_reference :employees, :user
  end
end
