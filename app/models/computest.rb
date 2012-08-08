class Computest < ActiveRecord::Base
  
  EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  
  validates :nombre, :apellido, :email, :telefono, :sexo, :altura, :peso, :presence => true
  
  validates :nombre, :length => { :maximum => 50 }
  validates :apellido, :length => { :maximum => 50 }
  validates :telefono, :length => { :maximum => 20 }
  validates :email, :length => { :maximum => 100 }, 
    :format => EMAIL_REGEX
  
  validates :altura, :numericality => { :greater_than => 1, :less_than => 3 }
  validates :altura, :format => { :with => /\d{1,2}\.\d{1,2}/,
      :message => "tiene que ser en metros, por ejemplo: 1.76" }
  
  validates :peso, :numericality => { :greater_than => 25, :less_than => 210 }
  validates :peso, :format => { :with => /\d{2,3}/,
          :message => "tiene que ser en kilos, por ejemplo: 75" }
end
