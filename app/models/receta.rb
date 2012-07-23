class Receta < ActiveRecord::Base

  extend FriendlyId
  friendly_id :nombre, :use => :slugged

  validates :nombre, :ingredientes, :preparacion, :presence => true

  validates_attachment_content_type :snapshot, :content_type =>  ['image/png', 'image/jpg', 'image/jpeg']
  validates_attachment_size :snapshot, :less_than => 4.megabytes
  
  
  has_attached_file :snapshot, :styles => { :regular => ["615x300#", :jpg], :thumb => ["100x100#", :jpg] },
                             :convert_options => { :thumb => "-quality 60", :regular => "-quality 80" }
  
end
