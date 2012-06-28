class CreateOfertas < ActiveRecord::Migration
  def self.up
    create_table :ofertas do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :ofertas
  end
end
