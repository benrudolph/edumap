class CreateOperations < ActiveRecord::Migration
  def up
    create_table :operations do |t|
      t.string :country
      t.string :iso
    end
  end

  def down
    drop_table :operations
  end
end
