class ProductosController < InheritedResources::Base
  before_filter :authenticate_admin!, :except => [ :index, :show ]
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
