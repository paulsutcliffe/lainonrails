class TestimoniosController < InheritedResources::Base
  
  before_filter :authenticate_admin!, :except => [ :index, :show ]
  
  before_filter :find_tipo
  
  def find_tipo
    if params[:tipo]
      @testimonios = Testimonio.where("tipo = ? AND pais = ?", params[:tipo], params[:locale]).order("created_at").paginate(:page => params[:page], :per_page => 8)
    else
      @testimonios = Testimonio.where("pais = ?", params[:locale]).order("created_at").paginate(:page => params[:page], :per_page => 8)
    end
  end

  def create
    @testimonio = Testimonio.new(params[:testimonio])
    if @testimonio.valid?
      @testimonio.pais = params[:locale]
      create!(:notice => "Testimonio guardado correctamente.") { testimonios_path }
    end
  end
  
  def update
    update!(:notice => "Testimonio actualizado correctamente.") { testimonios_path }
  end
  
  def destroy
    destroy!(:notice => "Testimonio eliminado correctamente.")
  end
  
end
