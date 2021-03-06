class CreateTestimonios < ActiveRecord::Migration
  def self.up
    create_table :testimonios do |t|
      t.string :nombre
      t.text :descripcion
      t.string :video_link
      t.string :tipo
      t.string :slug
      t.string :pais

      t.timestamps
    end
    add_index :testimonios, :slug, :unique => true
  end

  def self.down
    drop_table :testimonios
  end
end
