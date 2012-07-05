class SucursalesController < InheritedResources::Base
  def create
    create!(:notice => "Sucursal guardada correctamente.")
  end
  
  def update
    update!(:notice => "Sucursal actualizada correctamente.")
  end
  
  def destroy
    destroy!(:notice => "Sucursal eliminada correctamente.")
  end
end
