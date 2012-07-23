class Ad < ActiveRecord::Base
  
  validates_attachment_content_type :ad, :content_type =>  ['image/png', 'image/jpg', 'image/jpeg']
  validates_attachment_size :ad, :less_than => 4.megabytes
  validates_presence_of :ad
  
  has_attached_file :ad, :styles => { :regular => ["633x120>", :png], :thumb => ["83x32>", :png] }
  
end
