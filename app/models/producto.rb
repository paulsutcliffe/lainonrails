class Producto < ActiveRecord::Base
  
  extend FriendlyId
  friendly_id :nombre, :use => :slugged
  
  validates_attachment_content_type :picture, :content_type =>  ['image/png', 'image/jpg', 'image/jpeg']
  validates_attachment_size :picture, :less_than => 4.megabytes
  validates :picture, :nombre, :descripcion, :presence => true
  
  has_attached_file :picture, :styles => { :regular => ["800x600#", :jpg], :thumb => ["250x105#", :png],
                                           :regular => "-quality 100" }
  
  
end
