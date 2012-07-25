class CreatePromociones < ActiveRecord::Migration
  def self.up
    create_table :promociones do |t|
      t.string :nombre
      t.string :pais
      t.string :slug

      t.timestamps
    end
    add_index :promociones, :slug, :unique => true
  end

  def self.down
    drop_table :promociones
  end
end
