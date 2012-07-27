class HomeController < ApplicationController
  
  protect_from_forgery
  
  def index
    @banner = Banner.where("pais = ?", params[:locale]).first
    @ad = Ad.first
    @receta = Receta.where("pais = ?", params[:locale]).first
    if current_usuario
      @oferta = Oferta.first
    else
      if params[:locale]
        @slides = Slide.where("pais = ?", params[:locale])
        @testimonio = Testimonio.where("pais = ?", params[:locale]).first
      end
    end
  end
end
