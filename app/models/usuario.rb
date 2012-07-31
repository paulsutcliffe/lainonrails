#encoding: utf-8
class Usuario < ActiveRecord::Base
  
  validates :nombre, :apellido, :telefono, :altura, :peso, :presence => true
  
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email,
                  :password,
                  :password_confirmation,
                  :remember_me,
                  :nombre,
                  :apellido,
                  :telefono,
                  :altura,
                  :peso,
                  :hizodieta,
                  :edad,
                  :hobbies,
                  :fuma,
                  :dondehizodieta,
                  :sexo,
                  :pais

  def as_xls(options = {})
    {
        "Id" => id.to_s,
        "Nombre" => nombre,
        "Apellido" => apellido,
        "E-Mail" => email,
        "Teléfono" => telefono,
        "Sexo" => sexo,
        "Altura" => altura,
        "Peso" => peso,
        "Hizo Dieta" => hizodieta,
        "Edad" => edad,
        "Hobbies" => hobbies,
        "Fuma" => fuma,
        "Donde hizo dieta" => dondehizodieta,
    }
  end
  
end