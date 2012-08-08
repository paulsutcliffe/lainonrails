class OfertasController < InheritedResources::Base
  before_filter :authenticate_admin!
  load_and_authorize_resource
  def create
    create!(:notice => "Oferta guardada correctamente.")
  end
  
   def update
     update!(:notice => "Oferta actualizada correctamente.")
   end
   
   def destroy
     destroy!(:notice => "Oferta eliminada correctamente.")
   end
end
