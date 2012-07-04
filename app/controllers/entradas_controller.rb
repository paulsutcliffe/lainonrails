class EntradasController < InheritedResources::Base
  
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
