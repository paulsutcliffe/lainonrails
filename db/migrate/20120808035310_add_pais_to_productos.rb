class AddPaisToProductos < ActiveRecord::Migration
  def self.up
    add_column :productos, :pais, :string
  end

  def self.down
    remove_column :productos, :pais
  end
end
