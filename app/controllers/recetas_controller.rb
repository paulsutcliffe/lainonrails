class RecetasController < InheritedResources::Base
  before_filter :authenticate_admin!, :except => [ :index, :show ]
  before_filter :find_pais
  load_and_authorize_resource :except => [ :index, :show ]
  def find_pais
    if params[:locale]
      @recetas = Receta.where("pais = ?", params[:locale])
    end
  end
  
  def create
    @receta = Receta.new(params[:receta])
    if @receta.valid?
      @receta.pais = params[:locale]
      create!(:notice => "Receta guardada correctamente.")
    end
  end
  
  def update
    update!(:notice => "Receta actualizada correctamente.")
  end
   
  def destroy
    destroy!(:notice => "Receta eliminada correctamente.")
  end
end
