class Contacto < ActiveRecord::Base
  
  EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  
  validates :nombre, :presence => true, :length => { :maximum => 50 }
  validates :apellido, :presence => true, :length => { :maximum => 50 }
  validates :telefono, :presence => true, :length => { :maximum => 20 }
  validates :email, :presence => true, :length => { :maximum => 100 }, 
    :format => EMAIL_REGEX
  validates :mensaje, :presence => true, :length => { :maximum => 1000 }
  
end
