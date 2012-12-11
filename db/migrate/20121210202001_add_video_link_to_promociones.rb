class AddVideoLinkToPromociones < ActiveRecord::Migration
  def self.up
    add_column :promociones, :video_link, :string
  end

  def self.down
    remove_column :promociones, :video_link
  end
end
