class AddPaisToUsuarios < ActiveRecord::Migration
  def self.up
    add_column :usuarios, :pais, :string
  end

  def self.down
    add_column :usuarios, :pais
  end
end
