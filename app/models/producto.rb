class Producto < ActiveRecord::Base
  
  validates_attachment_content_type :picture, :content_type =>  ['image/png', 'image/jpg', 'image/jpeg']
  validates_attachment_size :picture, :less_than => 4.megabytes
  validates_presence_of :picture
  
  has_attached_file :picture, :styles => { :regular => ["800x600#", :jpg], :thumb => ["250x105#", :png],
                                           :regular => "-quality 100" }
  
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
