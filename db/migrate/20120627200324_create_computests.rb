class CreateComputests < ActiveRecord::Migration
  def self.up
    create_table :computests do |t|
      t.float :imc
      t.float :peso_ideal
      t.integer :usuario_id

      t.timestamps
    end
  end

  def self.down
    drop_table :computests
  end
end
