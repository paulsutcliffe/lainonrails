class AdsController < InheritedResources::Base
  before_filter :authenticate_admin!
  load_and_authorize_resource
  def create
      create!(:notice => "Anuncio guardado correctamente.")
  end
  
  def update
      update!(:notice => "Anuncio actualizado correctamente.")
  end
  
  def destroy
      destroy!(:notice => "Anuncio eliminado correctamente.")
  end
end
