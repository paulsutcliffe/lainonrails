class Contacto < ActiveRecord::Base

  EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  PHONE_REGEX = /^\(?([0-9]{2,4})\)?[-. ]?([0-9]{3,4})[-. ]?([0-9]{0,4})$/
  validates :nombre, :presence => true, :length => { :maximum => 50 }
  validates :apellido, :presence => true, :length => { :maximum => 50 }
  validates :telefono, :presence => true, :length => { :maximum => 12 },
    :format => PHONE_REGEX
  validates :email, :presence => true, :length => { :maximum => 100 },
    :format => EMAIL_REGEX
  validates :mensaje, :presence => true, :length => { :maximum => 1000 }

end
