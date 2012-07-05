class CreateSucursalTranslation < ActiveRecord::Migration
  def self.up
      Sucursal.create_translation_table!({
        :nombre => :string,
        :direccion => :string,
        :telefonos => :string
      }, {
        :migrate_data => true
      })
  end

  def self.down
    Sucursal.drop_translation_table! :migrate_data => true
  end
end
