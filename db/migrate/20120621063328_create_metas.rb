class CreateMetas < ActiveRecord::Migration
  def self.up
    create_table :metas do |t|
      t.string :keywords
      t.text :description

      t.timestamps
    end
  end

  def self.down
    drop_table :metas
  end
end
