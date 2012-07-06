class RecetasController < InheritedResources::Base
  before_filter :authenticate_admin!, :except => [ :index, :show ]
  def create
    create!(:notice => "Receta guardada correctamente.")
  end
  
  def update
    update!(:notice => "Receta actualizada correctamente.")
  end
   
  def destroy
    destroy!(:notice => "Receta eliminada correctamente.")
  end
end
