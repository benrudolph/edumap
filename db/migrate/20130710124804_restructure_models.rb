class RestructureModels < ActiveRecord::Migration
  def up
    remove_column :operations, :year

    remove_column :impact_indicators, :olbudget
    remove_column :impact_indicators, :aolbudget
    remove_column :impact_indicators, :oltarget
    remove_column :impact_indicators, :optarget
    remove_column :impact_indicators, :myr
    remove_column :impact_indicators, :yer
    rename_column :impact_indicators, :indicator, :name
    remove_column :impact_indicators, :baseline
    remove_column :impact_indicators, :standard

    remove_column :perf_indicators, :olbudget
    remove_column :perf_indicators, :aolbudget
    remove_column :perf_indicators, :oltarget
    remove_column :perf_indicators, :optarget
    remove_column :perf_indicators, :myr
    remove_column :perf_indicators, :yer
    rename_column :perf_indicators, :indicator, :name
  end

  def down
    add_column :operations, :year

    add_column :impact_indicators, :olbudget
    add_column :impact_indicators, :aolbudget
    add_column :impact_indicators, :oltarget
    add_column :impact_indicators, :optarget
    add_column :impact_indicators, :myr
    add_column :impact_indicators, :yer
    rename_column :impact_indicators, :name, :indicator
    add_column :impact_indicators, :baseline
    add_column :impact_indicators, :standard

    add_column :perf_indicators, :olbudget
    add_column :perf_indicators, :aolbudget
    add_column :perf_indicators, :oltarget
    add_column :perf_indicators, :optarget
    add_column :perf_indicators, :myr
    add_column :perf_indicators, :yer
    rename_column :perf_indicators, :name, :indicator
  end
end
