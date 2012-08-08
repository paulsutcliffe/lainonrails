class Admin < ActiveRecord::Base
  
  has_and_belongs_to_many :roles
  
  attr_accessible :role_ids
  
  ROLES = %w[super_admin blogger]
  
  def role?(role)
    return !!self.roles.find_by_name(role.to_s.camelize)
  end
  
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me
end
