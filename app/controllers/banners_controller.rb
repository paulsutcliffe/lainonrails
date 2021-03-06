class BannersController < InheritedResources::Base
  before_filter :authenticate_admin!
  before_filter :find_pais
  load_and_authorize_resource
  
  def find_pais
    if params[:locale]
      @banners = Banner.where("pais = ?", params[:locale])
    end
  end
  
  def create
    @banner = Banner.new(params[:banner])
    if @banner.valid?
      @banner.pais = params[:locale]
      create!(:notice => "Banner guardado correctamente.")
    end
  end
  
  def update
      update!(:notice => "Banner actualizado correctamente.")
  end
  
  def destroy
      destroy!(:notice => "Banner eliminado correctamente.")
  end
end
