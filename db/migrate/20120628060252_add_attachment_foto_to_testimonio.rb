class AddAttachmentFotoToTestimonio < ActiveRecord::Migration
  def self.up
    add_column :testimonios, :imagen_file_name, :string
    add_column :testimonios, :imagen_content_type, :string
    add_column :testimonios, :imagen_file_size, :integer
    add_column :testimonios, :imagen_updated_at, :datetime
  end

  def self.down
    remove_column :testimonios, :imagen_file_name
    remove_column :testimonios, :imagen_content_type
    remove_column :testimonios, :imagen_file_size
    remove_column :testimonios, :imagen_updated_at
  end
end
