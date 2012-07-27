class AddVideosToProductos < ActiveRecord::Migration
  def self.up
    add_column :productos, :video_link1, :string
    add_column :productos, :video_link2, :string
    add_column :productos, :video_link3, :string
  end

  def self.down
    remove_column :productos, :video_link1
    remove_column :productos, :video_link2
    remove_column :productos, :video_link3
  end
end
