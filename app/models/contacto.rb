class Contacto < ActiveRecord::Base
  validates :nombre, :apellido, :telefono, :email, :mensaje, :presence => true
end
