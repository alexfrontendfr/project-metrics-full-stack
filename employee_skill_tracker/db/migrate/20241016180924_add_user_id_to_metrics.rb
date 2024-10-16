class AddUserIdToMetrics < ActiveRecord::Migration[7.2]
  def up
    add_reference :metrics, :user, foreign_key: true, null: true

    # Bypass the check and allow existing records to have null user_id
    Metric.update_all(user_id: nil) # Set user_id to nil for all existing records
    
    # We won't add the `NOT NULL` constraint to avoid issues with existing data
    # If needed, we can add a validation on the model level later
  end

  def down
    remove_reference :metrics, :user
  end
end
