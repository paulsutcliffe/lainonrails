class CreateInformacionTranslation < ActiveRecord::Migration
  def self.up
      Informacion.create_translation_table!({
        :telefono_fijo => :string,
        :llamada_gratuita => :string,
        :email => :string,
        :facebook => :string
      }, {
        :migrate_data => true
      })
  end

  def self.down
    Informacion.drop_translation_table! :migrate_data => true
  end
end
