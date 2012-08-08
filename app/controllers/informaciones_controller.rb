#encoding: utf-8
class InformacionesController < InheritedResources::Base
  before_filter :authenticate_admin!
  before_filter :find_pais
  load_and_authorize_resource
  def find_pais
    if params[:locale]
      @informaciones = Informacion.where("pais = ?", params[:locale])
    end
  end
  
  def create
    @informacion = Informacion.new(params[:informacion])
    if @informacion.valid?
      @informacion.pais = params[:locale]
      create!(:notice => "Información guardada correctamente.") { home_path }
    end
  end
  
  def update
    update!(:notice => "Información actualizada correctamente.") { home_path }
  end
   
  def destroy
    destroy!(:notice => "Información eliminada correctamente.") { home_path }
  end
end
