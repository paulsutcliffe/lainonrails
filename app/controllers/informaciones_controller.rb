class InformacionesController < InheritedResources::Base
  before_filter :authenticate_admin!
  before_filter :find_pais
  
  def find_pais
    if params[:locale]
      @informaciones = Infomacion.where("pais = ?", params[:locale])
    end
  end
  def create
    @informacion = Informacion.new(params[:informacion])
    if @informacion.valid?
      @informacion.pais = params[:locale]
      create!(:notice => "Información guardada correctamente.")
    end
  end
  
  def update
    update!(:notice => "Información actualizada correctamente.")
  end
   
  def destroy
    destroy!(:notice => "Información eliminada correctamente.")
  end
end
