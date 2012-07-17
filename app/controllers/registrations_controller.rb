class RegistrationsController < Devise::RegistrationsController
  
  def new
    super
  end

  def create
    @usuario = Usuario.new(params[:usuario])
    if @usuario.valid?
      @usuario.pais = params[:locale]
      super
    end
  end

  def update
    super
  end
  
  protected

    def after_sign_up_path_for(resource)
      '/home'
    end
end