class CreatePpgs < ActiveRecord::Migration
  def up
    create_table :ppgs do |t|
      t.string :name
    end
  end

  def down
    drop_table :ppgs
  end
end
