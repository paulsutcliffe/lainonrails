class SlidesController < InheritedResources::Base
  def create
    create!(:notice => "Slide guardado correctamente.")
  end
  
  def update
    update!(:notice => "Slide actualizado correctamente.")
  end
  
  def destroy
    destroy!(:notice => "Slide eliminado correctamente.")
  end
end
