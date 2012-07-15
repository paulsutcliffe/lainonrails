class Testimonio < ActiveRecord::Base
  
  auto_html_for :video_link do
      youtube(:width => 400, :height => 250)
  end
  
  validates :nombre, :descripcion, :imagen, :presence => true
  
  validates_attachment_content_type :imagen, :content_type =>  ['image/png', 'image/jpg', 'image/jpeg']
  validates_attachment_size :imagen, :less_than => 4.megabytes
  
  has_attached_file :imagen, :styles => { :regular => ["250x105#", :png], :thumb => ["50x21#", :png] },
                             :convert_options => { :thumb => "-quality 100", :regular => "-quality 100" }
end
