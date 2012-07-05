class OfertasController < InheritedResources::Base
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
