class Producto < ActiveRecord::Base
  
  validates_attachment_content_type :picture, :content_type =>  ['image/png', 'image/jpg', 'image/jpeg']
  validates_attachment_size :picture, :less_than => 4.megabytes
  validates_presence_of :picture
  
  has_attached_file :picture, :styles => { :regular => ["615x300#", :jpg], :thumb => ["100x100#", :jpg] },
                             :convert_options => { :thumb => "-quality 60", :regular => "-quality 80" }

end
