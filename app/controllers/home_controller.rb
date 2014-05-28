# encoding: utf-8
class HomeController < ApplicationController

  #layout 'clean', :only => :llamadas

  protect_from_forgery

  def index

    if params[:dest]
      HTTParty.get('http://proxy.lemmor.com/VSServices/callback.aspx?source=00001825&dest=' + params[:dest] + '&login=012365&password=1653$&type=1')
      flash[:notice] = "Estamos llamándote, atento a tu teléfono."
    end

    @banner = Banner.where("pais = ?", params[:locale]).random
    @ad = Ad.first
    @receta = Receta.where("pais = ?", params[:locale]).random
    if current_usuario
      @oferta = Oferta.first
    else
      if params[:locale]
        @slides = Slide.where("pais = ?", params[:locale])
        @testimonio = Testimonio.where("pais = ?", params[:locale]).random
      end
    end
  end

  def llamadas
    render(:layout => "layouts/clean")
  end
end
