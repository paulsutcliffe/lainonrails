class CreateInformaciones < ActiveRecord::Migration
  def self.up
    create_table :informaciones do |t|
      t.string :telefono_fijo
      t.string :llamada_gratuita
      t.string :email
      t.string :facebook

      t.timestamps
    end
  end

  def self.down
    drop_table :informaciones
  end
end
