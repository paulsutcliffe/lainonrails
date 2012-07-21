class TestimoniosController < InheritedResources::Base
  
  before_filter :authenticate_admin!, :except => [ :index, :show ]
  
  before_filter :find_tipo
  
  def find_tipo
    if params[:tipo]
      @testimonios = Testimonio.where("tipo = ? AND pais = ?", params[:tipo], params[:locale])
    end
    #@testimonios = Testimonio.where("pais = ?", params[:locale])
  end

  def create
    @testimonio = Testimonio.new(params[:testimonio])
    if @testimonio.valid?
      @testimonio.pais = params[:locale]
      create!(:notice => "Testimonio guardado correctamente.") { testimonios_path(:tipo => params[:tipo]) }
    end
  end
  
  def update
    update!(:notice => "Testimonio actualizado correctamente.") { testimonios_path(:tipo => params[:tipo]) }
  end
  
  def destroy
    destroy!(:notice => "Testimonio eliminado correctamente.")
  end
  
end
