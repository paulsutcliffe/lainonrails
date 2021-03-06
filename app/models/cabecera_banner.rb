class CabeceraBanner < ActiveRecord::Base
  
  validates_attachment_content_type :cabecera_banner, :content_type =>  ['image/png', 'image/jpg', 'image/jpeg']
  validates_attachment_size :cabecera_banner, :less_than => 4.megabytes
  validates_presence_of :cabecera_banner
  
  has_attached_file :cabecera_banner, :styles => { :regular => ["450x100#", :png], :thumb => ["450x100#", :png] }
                             
  
end
