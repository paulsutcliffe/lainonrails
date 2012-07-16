class HomeController < ApplicationController
  
  protect_from_forgery
  
  def index
    @banner = Banner.first
    @ad = Ad.first
    @receta = Receta.order("RAND()").first
    if current_usuario
      @oferta = Oferta.order("RAND()").first
    else
      @testimonio = Testimonio.order("RAND()").first
      @slides = Slide.all
      @entrada = Entrada.last
    end
  end
end
