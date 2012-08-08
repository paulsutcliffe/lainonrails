class Ability
  include CanCan::Ability

  def initialize(admin)
    admin ||= Admin.new # guest admin

    if admin.role? :super_admin
      can :manage, :all
    else
      if admin.role? :blogger
        can :manage, Entrada
        #cannot :destroy, Entrada
      end
    end
  end
end
