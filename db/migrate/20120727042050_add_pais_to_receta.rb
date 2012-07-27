class AddPaisToReceta < ActiveRecord::Migration
  def self.up
    add_column :recetas, :pais, :string
  end

  def self.down
    remove_column :recetas, :pais
  end
end
