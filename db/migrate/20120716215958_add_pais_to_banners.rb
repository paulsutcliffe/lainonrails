class AddPaisToBanners < ActiveRecord::Migration
  def self.up
    add_column :banners, :pais, :string
  end

  def self.down
    remove_column :banners, :pais
  end
end
