class Testimonio < ActiveRecord::Base
  
  #TIPOS = ['testimonios', 'antesydespues']
  
  #validates :tipo, :inclusion => { :in => TIPOS }, :presence => true
  validates :nombre, :presence => true
  validates :descripcion, :presence => true
  
  validates_attachment_content_type :imagen, :content_type =>  ['image/png', 'image/jpg', 'image/jpeg']
  validates_attachment_size :imagen, :less_than => 4.megabytes
  validates_presence_of :imagen
  
  has_attached_file :imagen, :styles => { :regular => ["615x300#", :jpg], :thumb => ["100x100#", :jpg] },
                             :convert_options => { :thumb => "-quality 60", :regular => "-quality 80" }
end
