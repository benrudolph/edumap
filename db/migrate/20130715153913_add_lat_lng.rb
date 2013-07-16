class AddLatLng < ActiveRecord::Migration
  def change
    add_column :operations, :lng, :integer
    add_column :operations, :lat, :integer
  end
end
