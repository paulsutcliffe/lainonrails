class HomeController < ApplicationController
  def index
    if current_admin
      @oferta = Oferta.limit(1)
      @receta = Receta.order("RAND()").first
    else
      @slides = Slide.all
      @ad = Ad.limit(1)
      @cabecera_banner = CabeceraBanner.limit(1)
      @entrada = Entrada.limit(1)
    end
    @banner = Banner.limit(1)
  end

end
