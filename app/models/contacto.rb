class Contacto < ActiveRecord::Base
  validates :nombre, :apellido, :telefono, :email, :mensaje, :presence => true
  validates :politicas do |ag|
    ag.errors.add "Must" unless self.agreement
  end
end
