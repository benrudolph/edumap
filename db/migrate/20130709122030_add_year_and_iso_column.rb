class AddYearAndIsoColumn < ActiveRecord::Migration
  def up
    add_column :operations, :year, :string
  end

  def down
    remove_column :operations, :year
  end
end
