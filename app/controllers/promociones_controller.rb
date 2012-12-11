#encoding: utf-8
class PromocionesController < InheritedResources::Base

  before_filter :authenticate_admin!, :except => [ :index, :show ]
  before_filter :find_pais
  load_and_authorize_resource :except => [ :index, :show ]
  def find_pais
    if params[:locale]
      @promociones = Promocion.where("pais = ?", params[:locale])
    end
  end

  def show
    @promocion = Promocion.find_by_pais(params[:locale])
  end

  def create
    @promocion = Promocion.new(params[:promocion])
    if @promocion.valid?
      @promocion.pais = params[:locale]
      create!(:notice => "Promoción guardada correctamente.")
    end
  end

  def update
      update!(:notice => "Promoción actualizada correctamente.")
  end

  def destroy
      destroy!(:notice => "Promoción eliminada correctamente.")
  end

end
