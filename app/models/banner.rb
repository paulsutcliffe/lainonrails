class Banner < ActiveRecord::Base
  
  attr_accessor :banner
  
  validates_attachment_content_type :banner, :content_type =>  ['image/png', 'image/jpg', 'image/jpeg']
  validates_attachment_size :banner, :less_than => 4.megabytes
  validates_presence_of :banner
  
  has_attached_file :banner, :styles => { :regular => ["633x120#", :png], :thumb => ["83x32#", :png] },
                             :convert_options => { :thumb => "-quality 100", :regular => "-quality 100" }
end

