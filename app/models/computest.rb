class Computest < ActiveRecord::Base
  
  validates :nombre, :apellido, :email, :telefono, :sexo, :altura, :peso, :presence => true
  
end
