class CreateDatumDatatype < ActiveRecord::Migration
  def up
    create_table :datums do |t|
      t.string :olbudget
      t.string :aolbudget
      t.string :baseline
      t.string :standard
      t.string :oltarget
      t.string :optarget
      t.string :myr
      t.string :yer
      t.string :year
      t.references :indicator, polymorphic: true
    end
  end

  def down
    remove_table :datums
  end
end
