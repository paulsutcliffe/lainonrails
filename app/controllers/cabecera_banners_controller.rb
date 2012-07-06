class CabeceraBannersController < InheritedResources::Base
  before_filter :authenticate_admin!
  def create
      create!(:notice => "Banner guardado correctamente.")
  end
  
  def update
      update!(:notice => "Banner actualizado correctamente.")
  end
  
  def destroy
      destroy!(:notice => "Banner eliminado correctamente.")
  end
end
