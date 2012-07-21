class BannersController < InheritedResources::Base
  before_filter :authenticate_admin!
  before_filter :find_pais
  
  def find_pais
    if params[:locale]
      @banners = Banner.where("pais = ?", params[:locale])
    end
  end
  
  def create
    @banner = Banner.new(params[:banner])
    if @banner.valid?
      @banner.pais = params[:locale]
      create!(:notice => "Información guardada correctamente.")
    end
  end
  
  def update
      update!(:notice => "Banner actualizado correctamente.")
  end
  
  def destroy
      destroy!(:notice => "Banner eliminado correctamente.")
  end
end
