class TestimoniosController < InheritedResources::Base
  
  before_filter :authenticate_admin!, :except => [ :index, :show ]
  
  before_filter :find_tipo
  
  def find_tipo
    if params[:tipo]
      @testimonios = Testimonio.where("tipo = ?", :tipo => params[:tipo])
    end
  end
  
end
