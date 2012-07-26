class CreateCabeceraBanners < ActiveRecord::Migration
  def self.up
    create_table :cabecera_banners do |t|
      t.string :pais

      t.timestamps
    end
  end

  def self.down
    drop_table :cabecera_banners
  end
end
