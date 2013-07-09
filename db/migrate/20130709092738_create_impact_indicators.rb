class CreateImpactIndicators < ActiveRecord::Migration
  def up
    create_table :impact_indicators do |t|
      t.string :objective
      t.string :olbudget
      t.string :aolbudget
      t.string :indicator
      t.string :baseline
      t.string :standard
      t.string :oltarget
      t.string :optarget
      t.string :myr
      t.string :yer
    end
  end

  def down
    drop_table :impact_indicators
  end
end
