class Oferta < ActiveRecord::Base

  validates_attachment_content_type :oferta, :content_type =>  ['image/png', 'image/jpg', 'image/jpeg']
  validates_attachment_size :oferta, :less_than => 4.megabytes
  validates_presence_of :oferta
  
  has_attached_file :oferta, :styles => { :regular => ["615x300#", :jpg], :thumb => ["100x100#", :jpg] },
                             :convert_options => { :thumb => "-quality 60", :regular => "-quality 80" }

end
