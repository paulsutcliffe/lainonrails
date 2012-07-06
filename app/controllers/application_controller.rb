class ApplicationController < ActionController::Base
  before_filter :set_i18n_locale_from_params 
  
  before_filter :load_general_information
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
      when "RD"
        I18n.locale = :rd
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
  
    def load_general_information
      @cabecera_banner = CabeceraBanner.first
      @informacion = Informacion.first
      @meta_tags = Meta.first
    end
    
    
  protected
  
    def set_i18n_locale_from_params
      if params[:locale]
        if I18n.available_locales.include?(params[:locale].to_sym)
          I18n.locale = params[:locale]
        else
          flash.now[:notice] = "#{params[:locale]} translation not available"
          logger.error flash.now[:notice]
        end 
      end
    end
    
    def default_url_options
      { :locale => I18n.locale }
    end
  
end
