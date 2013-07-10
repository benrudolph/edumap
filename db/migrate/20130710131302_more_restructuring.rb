class MoreRestructuring < ActiveRecord::Migration
  def up
    add_column :data, :operation_id, :integer
    add_column :data, :ppg_id, :integer
    remove_column :ppgs, :operation_id
    remove_column :impact_indicators, :ppg_id
    remove_column :perf_indicators, :ppg_id
  end

  def down
    remove_column :data, :operation_id, :integer
    remove_column :data, :ppg_id, :integer
    add_column :ppgs, :operation_id
    add_column :impact_indicators, :ppg_id
    add_column :perf_indicators, :ppg_id
  end
end
