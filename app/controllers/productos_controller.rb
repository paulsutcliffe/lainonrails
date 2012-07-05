class ProductosController < InheritedResources::Base
  def create
    create!(:notice => "Producto guardado correctamente.")
  end
  def update
    update!(:notice => "Producto actualizado correctamente.")
  end
  def destroy
    destroy!(:notice => "Producto eliminado correctamente.")
  end
end
