class SucursalesController < InheritedResources::Base
  before_filter :authenticate_admin!, :except => [ :index, :show ]
  before_filter :find_pais
  load_and_authorize_resource :except => [ :index, :show ]
  def find_pais
    if params[:locale]
      @sucursales = Sucursal.where("pais = ?", params[:locale])
    end
  end
  
  def create
    @sucursal = Sucursal.new(params[:sucursal])
    @sucursal.pais = params[:locale]
    if @sucursal.valid?
      create!(:notice => "Sucursal guardada correctamente.") { sucursales_path }
    end
  end
  
  def update
    update!(:notice => "Sucursal actualizada correctamente.")
  end
  
  def destroy
    destroy!(:notice => "Sucursal eliminada correctamente.")
  end
end
