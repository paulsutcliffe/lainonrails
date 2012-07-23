class Sucursal < ActiveRecord::Base

  validates_attachment_content_type :local, :content_type =>  ['image/png', 'image/jpg', 'image/jpeg']
  validates_attachment_size :local, :less_than => 4.megabytes
  validates :local, :nombre, :direccion, :presence => true
  
  has_attached_file :local, :styles => { :regular => ["615x300#", :jpg], :thumb => ["100x100#", :jpg] },
                             :convert_options => { :thumb => "-quality 60", :regular => "-quality 80" }
    
end
