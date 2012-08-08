class MetasController < InheritedResources::Base
  before_filter :authenticate_admin!
  load_and_authorize_resource
  def create
      create!(:notice => "Metas guardados correctamente.")
  end
  
  def update
      update!(:notice => "Metas actualizados correctamente.")
  end
  
  def destroy
      destroy!(:notice => "Metas eliminados correctamente.")
  end
end
