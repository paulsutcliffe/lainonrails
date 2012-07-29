class UsuariosController < ApplicationController
  before_filter :authenticate_admin!, :only => [ :lista, :ver ]
  
  def lista
    @usuarios = Usuario.all
  end
  
  def ver
    @usuario = Usuario.find_by_id(params[:id])
  end
  
end
