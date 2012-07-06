class SlidesController < InheritedResources::Base
  before_filter :authenticate_admin!
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
