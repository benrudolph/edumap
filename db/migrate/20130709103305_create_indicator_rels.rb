class CreateIndicatorRels < ActiveRecord::Migration
  def up
    add_column :impact_indicators, :ppg_id, :integer
    add_column :perf_indicators, :ppg_id, :integer
    add_column :ppgs, :operation_id, :integer
  end

  def down
    remove_column :impact_indicators, :ppg_id
    remove_column :perf_indicators, :ppg_id
    remove_column :ppgs, :operation_id
  end
end
