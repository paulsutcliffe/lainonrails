class HomeController < ApplicationController
  
  protect_from_forgery
  
  def index
    @banners = Banner.where("pais = ?", params[:locale])
    @ad = Ad.first
    @receta = Receta.order("RAND()").first
    if current_usuario
      @oferta = Oferta.order("RAND()").first
    else
      @testimonio = Testimonio.order("RAND()").first
      if params[:locale]
        @slides = Slide.where("pais = ?", params[:locale])
      end
      @entrada = Entrada.last
    end
  end
end
