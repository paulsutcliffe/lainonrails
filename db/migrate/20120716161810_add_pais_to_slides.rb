class AddPaisToSlides < ActiveRecord::Migration
  def self.up
    add_column :slides, :pais, :string
  end

  def self.down
    remove_column :slides, :pais
  end
end
