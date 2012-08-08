class CabeceraBannersController < InheritedResources::Base
  before_filter :authenticate_admin!
  before_filter :find_pais
  load_and_authorize_resource
  
  def find_pais
    if params[:locale]
      @cabecera_banners = CabeceraBanner.where("pais = ?", params[:locale])
    end
  end
  
  def create
    @cabecera_banner = CabeceraBanner.new(params[:cabecera_banner])
    if @cabecera_banner.valid?
      @cabecera_banner.pais = params[:locale]
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
