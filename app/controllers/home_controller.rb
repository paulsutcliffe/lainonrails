class HomeController < ApplicationController
  def index
    @banner = Banner.first
    @informacion = Informacion.first
    if current_usuario
      @oferta = Oferta.order("RAND()").first
      @receta = Receta.order("RAND()").first
    else
      @testimonio = Testimonio.order("RAND()").first
      @slides = Slide.all
      @ad = Ad.first
      @entrada = Entrada.last
    end
  end
end
