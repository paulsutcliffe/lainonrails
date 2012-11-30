class ProductosController < InheritedResources::Base
  before_filter :authenticate_admin!, :except => [ :index, :show ]
  load_and_authorize_resource :except => [ :index, :show ]

  before_filter :find_pais
  def find_pais
    if params[:locale]
      @productos = Producto.where("pais = ?", params[:locale]).order("created_at DESC")
    end
  end

  def create
    @producto = Producto.new(params[:producto])
    if @producto.valid?
      @producto.pais = params[:locale]
      create!(:notice => "Producto guardado correctamente.")
    end
  end
  def update
    update!(:notice => "Producto actualizado correctamente.")
  end
  def destroy
    destroy!(:notice => "Producto eliminado correctamente.")
  end
  protected
    def collection
      @productos ||= end_of_association_chain.order("created_at DESC")
    end
end
