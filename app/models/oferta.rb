class Oferta < ActiveRecord::Base

  validates_attachment_content_type :oferta, :content_type =>  ['image/png', 'image/jpg', 'image/jpeg']
  validates_attachment_size :oferta, :less_than => 4.megabytes
  validates_presence_of :oferta
  
  has_attached_file :oferta, :styles => { :regular => ["210x300#", :png], :thumb => ["100x100#", :png] },
                           :convert_options => { :thumb => Proc.new{self.convert_options}, :regular => Proc.new{self.convert_options} }

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
