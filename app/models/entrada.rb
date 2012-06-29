class Entrada < ActiveRecord::Base
  has_attached_file :avatar, :styles => { :regular => ["615x300#", :jpg], :thumb => ["100x100#", :jpg] },
                               :convert_options => { :thumb => "-quality 60", :regular => "-quality 80" }
end
