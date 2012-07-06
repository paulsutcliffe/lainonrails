class CreateContactos < ActiveRecord::Migration
  def self.up
    create_table :contactos do |t|
      t.string :nombre
      t.string :apellido
      t.string :email
      t.string :telefono
      t.string :direccion
      t.string :distrito
      t.string :ciudad
      t.string :provincia
      t.text :mensaje
      t.string :pais

      t.timestamps
    end
  end

  def self.down
    drop_table :contactos
  end
end
