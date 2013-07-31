class AddAction < ActiveRecord::Migration
  def up
    add_column :impact_indicators, :action_id, :integer
    add_column :perf_indicators, :action_id, :integer
  end

  def down
    remove_column :impact_indicators, :action_id
    remove_column :perf_indicators, :action_id
  end
end
