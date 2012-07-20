class ApplicationController < ActionController::Base

  before_filter :set_i18n_locale_from_params 
  
  before_filter :load_general_information
  
  def load_general_information
    @cabecera_banner = CabeceraBanner.first
    @informacion = Informacion.where("pais = ?", params[:locale]).first
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
    
    
    def body_id
      @body_id = params[:controller].parameterize    
    end

    def body_class
      @body_class = params[:action].parameterize

      if params[:controller] == 'home'
        @front = 'front'  
      else
        @front = 'not-front'  
      end 

      @body_class = @body_class + ' ' + @front
    end

    helper_method :body_id
    helper_method :body_class
  
end
