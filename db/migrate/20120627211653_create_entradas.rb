class CreateEntradas < ActiveRecord::Migration
  def self.up
    create_table :entradas do |t|
      t.string :titulo
      t.text :contenido
      t.string :slug

      t.timestamps
    end
    add_index :entradas, :slug, :unique => true
  end

  def self.down
    drop_table :entradas
  end
end
