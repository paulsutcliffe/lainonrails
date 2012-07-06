class TestimoniosController < InheritedResources::Base
  
  before_filter :authenticate_admin!, :except => [ :index, :show ]
  
  before_filter :find_tipo
  
  def find_tipo
    if params[:tipo]
      @testimonios = Testimonio.where("tipo = ?", params[:tipo])
    end
  end
  
  def create
    create!(:notice => "Testimonio guardado correctamente.")
  end
  
  def update
    update!(:notice => "Testimonio actualizado correctamente.")
  end
  
  def destroy
    destroy!(:notice => "Testimonio eliminado correctamente.")
  end
  
end
