class Promocion < ActiveRecord::Base
  
  extend FriendlyId
  friendly_id :nombre, :use => :slugged
  
  validates_attachment_content_type :publicidad, :content_type =>  ['image/png', 'image/jpg', 'image/jpeg']
  validates_attachment_size :publicidad, :less_than => 4.megabytes
  validates_presence_of :publicidad
  
  has_attached_file :publicidad, :styles => { :facebook => ["851x315#", :jpg], :regular => ["600x222#", :jpg] }
  
end
