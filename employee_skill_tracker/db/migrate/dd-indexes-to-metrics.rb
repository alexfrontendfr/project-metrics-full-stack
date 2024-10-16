class AddIndexesToMetrics < ActiveRecord::Migration[6.0]
    def change
      add_index :metrics, :timestamp
      add_index :metrics, :name
    end
  end