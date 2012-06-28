class AddAttachmentOfertaToOferta < ActiveRecord::Migration
  def self.up
    add_column :ofertas, :oferta_file_name, :string
    add_column :ofertas, :oferta_content_type, :string
    add_column :ofertas, :oferta_file_size, :integer
    add_column :ofertas, :oferta_updated_at, :datetime
  end

  def self.down
    remove_column :ofertas, :oferta_file_name
    remove_column :ofertas, :oferta_content_type
    remove_column :ofertas, :oferta_file_size
    remove_column :ofertas, :oferta_updated_at
  end
end
