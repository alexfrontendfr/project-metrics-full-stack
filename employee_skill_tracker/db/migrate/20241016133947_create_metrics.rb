class CreateMetrics < ActiveRecord::Migration[7.2]
  def change
    create_table :metrics do |t|
      t.string :name
      t.float :value
      t.datetime :timestamp

      t.timestamps
    end
  end
end
