class AddAttachmentFotoToSucursal < ActiveRecord::Migration
  def self.up
    add_column :sucursales, :local_file_name, :string
    add_column :sucursales, :local_content_type, :string
    add_column :sucursales, :local_file_size, :integer
    add_column :sucursales, :local_updated_at, :datetime
  end

  def self.down
    remove_column :sucursales, :local_file_name
    remove_column :sucursales, :local_content_type
    remove_column :sucursales, :local_file_size
    remove_column :sucursales, :local_updated_at
  end
end
