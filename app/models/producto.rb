class Producto < ActiveRecord::Base
  
  extend FriendlyId
  friendly_id :nombre, :use => :slugged
  
  auto_html_for :video_link1 do
      youtube(:width => 190, :height => 119)
  end
  
  auto_html_for :video_link2 do
      youtube(:width => 190, :height => 119)
  end
  
  auto_html_for :video_link3 do
      youtube(:width => 190, :height => 119)
  end
  
  validates_attachment_content_type :picture, :content_type =>  ['image/png', 'image/jpg', 'image/jpeg']
  validates_attachment_size :picture, :less_than => 4.megabytes
  validates :picture, :nombre, :descripcion, :presence => true
  
  has_attached_file :picture, :styles => { :facebook => ["851x315#", :jpg], :regular => ["600x222#", :jpg] }
  
end