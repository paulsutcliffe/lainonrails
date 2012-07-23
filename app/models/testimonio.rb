class Testimonio < ActiveRecord::Base
  
  extend FriendlyId
  friendly_id :nombre, :use => :slugged
  
  validates :nombre, :descripcion, :imagen, :presence => true
  
  validates_attachment_content_type :imagen, :content_type =>  ['image/png', 'image/jpg', 'image/jpeg']
  validates_attachment_size :imagen, :less_than => 4.megabytes
  
  has_attached_file :imagen, :styles => { :regular => ["800x600#", :jpg], :thumb => ["250x105#", :png], :thumb_front => ["193x101#", :png] },
                             :convert_options => { :thumb_front => Proc.new{self.convert_options}, :regular => "-quality 100" }
                             
  

  def self.convert_options
    trans = ""
    px = 6
    trans << " \\( +clone  -threshold -1 "
    trans << "-draw 'fill black polygon 0,0 0,#{px} #{px},0 fill white circle #{px},#{px} #{px},0' "
    trans << "\\( +clone -flip \\) -compose Multiply -composite "
    trans << "\\( +clone -flop \\) -compose Multiply -composite "
    trans << "\\) +matte -compose CopyOpacity -composite "
  end
  
end