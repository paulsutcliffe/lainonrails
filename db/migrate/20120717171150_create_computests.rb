class CreateComputests < ActiveRecord::Migration
  def self.up
    create_table :computests do |t|
      t.string :nombre
      t.string :apellido
      t.string :email
      t.string :telefono
      t.string :sexo
      t.float :altura
      t.float :peso
      t.integer :imc
      t.string :estado
      t.string :peso_ideal
      t.string :pais

      t.timestamps
    end
  end

  def self.down
    drop_table :computests
  end
end
