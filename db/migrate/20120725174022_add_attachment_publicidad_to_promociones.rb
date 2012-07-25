class AddAttachmentPublicidadToPromociones < ActiveRecord::Migration
  def self.up
    add_column :promociones, :publicidad_file_name, :string
    add_column :promociones, :publicidad_content_type, :string
    add_column :promociones, :publicidad_file_size, :integer
    add_column :promociones, :publicidad_updated_at, :datetime
  end

  def self.down
    remove_column :promociones, :publicidad_file_name
    remove_column :promociones, :publicidad_content_type
    remove_column :promociones, :publicidad_file_size
    remove_column :promociones, :publicidad_updated_at
  end
end
