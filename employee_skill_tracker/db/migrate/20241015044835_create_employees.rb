class CreateEmployees < ActiveRecord::Migration[7.2]
  def change
    create_table :employees do |t|
      t.string :name, null: false
      t.string :department, null: false
      t.string :role, null: false
      t.date :start_date

      t.timestamps
    end
  end
end
