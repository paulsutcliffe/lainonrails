class ApplicationController < ActionController::Base
  before_filter :set_i18n_locale_from_params 
  
  before_filter :load_general_information
  
  
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
