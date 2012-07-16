class PaisesController < ApplicationController
  
  before_filter :detect_ip_location
  
  def index
  end
  
  public 

    def detect_ip_location
      @country_code = request.location.country_code
      case @country_code
      when "PE"
        redirect_to '/pe/home'
      when "BO"
        redirect_to '/bo/home'
      when "CR"
        redirect_to '/cr/home'
      when "GT"
        redirect_to '/gt/home'
      when "SV"
        redirect_to '/sv/home'
      when "UY"
        redirect_to '/uy/home'
      end
    end

end
