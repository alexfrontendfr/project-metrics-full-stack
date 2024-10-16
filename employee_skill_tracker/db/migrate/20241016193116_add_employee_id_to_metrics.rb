class AddEmployeeIdToMetrics < ActiveRecord::Migration[7.2]
  def up
    add_reference :metrics, :employee, foreign_key: true, null: true

    # Assign a default employee to existing metrics
    default_employee = Employee.first
    if default_employee
      Metric.update_all(employee_id: default_employee.id)
    else
      puts "No employees found. Please create at least one employee before running this migration."
      raise ActiveRecord::IrreversibleMigration
    end

    change_column_null :metrics, :employee_id, false
  end

  def down
    remove_reference :metrics, :employee
  end
end