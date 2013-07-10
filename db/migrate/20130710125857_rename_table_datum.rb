class RenameTableDatum < ActiveRecord::Migration
  def up
    rename_table :datums, :data
  end

  def down
    rename_table :data, :datums
  end
end
