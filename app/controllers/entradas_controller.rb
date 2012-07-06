class EntradasController < InheritedResources::Base
  before_filter :authenticate_admin!, :except => [ :index, :show ]
  def create
      create!(:notice => "Entrada publicada correctamente.")
  end
  
  def update
      update!(:notice => "Entrada actualizada correctamente.")
  end
  
  def destroy
      destroy!(:notice => "Entrada eliminada correctamente.")
  end
  
end
