class AddAttachmentFotoToReceta < ActiveRecord::Migration
  def self.up
    add_column :recetas, :snapshot_file_name, :string
    add_column :recetas, :snapshot_content_type, :string
    add_column :recetas, :snapshot_file_size, :integer
    add_column :recetas, :snapshot_updated_at, :datetime
  end

  def self.down
    remove_column :recetas, :snapshot_file_name
    remove_column :recetas, :snapshot_content_type
    remove_column :recetas, :snapshot_file_size
    remove_column :recetas, :snapshot_updated_at
  end
end
