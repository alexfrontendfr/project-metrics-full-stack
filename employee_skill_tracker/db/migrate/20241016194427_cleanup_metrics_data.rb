class CleanupMetricsData < ActiveRecord::Migration[7.2]
  def up
    # Skip checking for users and employees
    if User.exists? && Employee.exists?
      Metric.where(user_id: nil).delete_all
      Metric.where(employee_id: nil).delete_all
    else
      puts "Skipping cleanup as no users or employees are present."
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
