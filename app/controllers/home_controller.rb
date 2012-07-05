class HomeController < ApplicationController
  def index
    @banner = Banner.first
    if current_usuario
      @oferta = Oferta.order("RAND()").first
      @receta = Receta.order("RAND()").first
    else
      @slides = Slide.all
      @ad = Ad.first
      @entrada = Entrada.last
    end
  end
end
