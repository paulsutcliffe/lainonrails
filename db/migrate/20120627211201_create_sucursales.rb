class CreateSucursales < ActiveRecord::Migration
  def self.up
    create_table :sucursales do |t|
      t.timestamps
      t.string :nombre
      t.string :direccion
      t.string :telefonos
    end
  end

  def self.down
    drop_table :sucursales
  end
end
