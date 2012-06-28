class AddAttachmentBannerToCabeceraBanner < ActiveRecord::Migration
  def self.up
    add_column :cabecera_banners, :banner_file_name, :string
    add_column :cabecera_banners, :banner_content_type, :string
    add_column :cabecera_banners, :banner_file_size, :integer
    add_column :cabecera_banners, :banner_updated_at, :datetime
  end

  def self.down
    remove_column :cabecera_banners, :banner_file_name
    remove_column :cabecera_banners, :banner_content_type
    remove_column :cabecera_banners, :banner_file_size
    remove_column :cabecera_banners, :banner_updated_at
  end
end
