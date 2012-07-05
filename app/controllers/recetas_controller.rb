class RecetasController < InheritedResources::Base
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
