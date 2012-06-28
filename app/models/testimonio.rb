class Testimonio < ActiveRecord::Base
  TIPOS = ['testimonios', 'antesydespues']
  
  validates :tipo, :inclusion => { :in => TIPOS }, :presence => true
  validates :nombre, :presence => true
  validates :descripcion, :presence => true
  
  has_attached_file :foto, :styles => { :medium => "300x300>", :thumb => "100x100>" }
end
