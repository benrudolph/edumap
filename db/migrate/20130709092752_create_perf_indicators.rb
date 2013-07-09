class CreatePerfIndicators < ActiveRecord::Migration
  def up
    create_table :perf_indicators do |t|
      t.string :output
      t.string :olbudget
      t.string :aolbudget
      t.string :indicator
      t.string :oltarget
      t.string :optarget
      t.string :myr
      t.string :yer
    end
  end

  def down
    drop_table :perf_indicators
  end
end
