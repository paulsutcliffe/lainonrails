class SlidesController < InheritedResources::Base
  before_filter :authenticate_admin!
  before_filter :find_pais
  
  def find_pais
    if params[:locale]
      @slides = Slide.where("pais = ?", params[:locale])
    end
  end
  
  def create
    @slide = Slide.new(params[:slide])
    if @slide.valid?
      @slide.pais = params[:locale]
      create!(:notice => "Slide guardado correctamente.")
    end
  end
  
  def update
    update!(:notice => "Slide actualizado correctamente.")
  end
  
  def destroy
    destroy!(:notice => "Slide eliminado correctamente.")
  end
end
