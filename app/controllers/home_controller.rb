class HomeController < ApplicationController
  
  before_filter :detect_ip_location
  
  protect_from_forgery
  
  public 
  
    def detect_ip_location
      @city = request.location.city
      @country_code = request.location.country_code
      @country = request.location.country
      @ip = request.ip
      case @country_code
      when "PE"
        I18n.locale = :pe
      when "BO"
        I18n.locale = :bo
      when "BO"
        I18n.locale = :bo
      when "CR"
        I18n.locale = :cr
      when "GT"
        I18n.locale = :gt
      when "SV"
        I18n.locale = :sv
      when "UY"
        I18n.locale = :uy
      else
        I18n.locale = :pe
      end
    end
  
  
  def index
    @banner = Banner.first
    @informacion = Informacion.where("pais = ?", params[:locale]).first
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
