class Slide < ActiveRecord::Base
  
  validates_attachment_content_type :slide, :content_type =>  ['image/png', 'image/jpg', 'image/jpeg']
  validates_attachment_size :slide, :less_than => 4.megabytes
  validates_presence_of :slide
  
  has_attached_file :slide, :styles => { :regular => ["550x280#", :png], :thumb => ["55x28#", :png] }
  
end
