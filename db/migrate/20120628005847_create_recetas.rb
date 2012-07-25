class CreateRecetas < ActiveRecord::Migration
  def self.up
    create_table :recetas do |t|
      t.string :nombre
      t.text :ingredientes
      t.text :preparacion
      t.string :slug

      t.timestamps
    end
    add_index :recetas, :slug, :unique => true
  end

  def self.down
    drop_table :recetas
  end
end
