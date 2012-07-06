class InformacionesController < InheritedResources::Base
  before_filter :authenticate_admin!
  def create
    create!(:notice => "Información guardada correctamente.")
  end
  
  def update
    update!(:notice => "Información actualizada correctamente.")
  end
   
  def destroy
    destroy!(:notice => "Información eliminada correctamente.")
  end
end
