class Sucursal < ActiveRecord::Base
  
  translates :nombre,
             :direccion,
             :telefonos

  accepts_nested_attributes_for :translations
    
end
