class Banner < ActiveRecord::Base
  
  validates_attachment_content_type :banner, :content_type =>  ['image/png', 'image/jpg', 'image/jpeg']
  validates_attachment_size :banner, :less_than => 4.megabytes
  validates_presence_of :banner
  
  has_attached_file :banner, :styles => { :regular => ["633x120#", :png], :thumb => ["83x32#", :png] }
end

