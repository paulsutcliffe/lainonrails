class CreateProductos < ActiveRecord::Migration
  def self.up
    create_table :productos do |t|
      t.string :nombre
      t.text :descripcion
      t.string :slug

      t.timestamps
    end
    add_index :productos, :slug, :use => true
  end

  def self.down
    drop_table :productos
  end
end
