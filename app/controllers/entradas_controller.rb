class EntradasController < InheritedResources::Base
  before_filter :authenticate_admin!, :except => [ :index, :show ]
  load_and_authorize_resource :except => [ :index, :show ]
  def create
      create!(:notice => "Entrada publicada correctamente.")
  end
  
  def update
      update!(:notice => "Entrada actualizada correctamente.")
  end
  
  def destroy
      destroy!(:notice => "Entrada eliminada correctamente.")
  end
  
  protected
    def collection
      @entradas ||= end_of_association_chain.order("created_at DESC").paginate(:page => params[:page], :per_page => 8)
    end
end
