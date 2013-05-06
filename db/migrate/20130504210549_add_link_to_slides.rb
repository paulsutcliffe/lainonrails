class AddLinkToSlides < ActiveRecord::Migration
  def self.up
    add_column :slides, :link, :string
  end

  def self.down
    remove_column :slides, :link
  end
end
