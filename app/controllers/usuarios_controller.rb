class UsuariosController < ApplicationController
  before_filter :authenticate_admin!, :only => [ :lista, :ver ]
  
  def lista
    @usuarios = Usuario.order("created_at DESC")
    respond_to do |format|
      format.html
      format.xls { send_data @usuarios.to_xls(:headers => ["Id",
                   "nombre",
                   "apellido",
                   "sexo",
                   "email",
                   "telefono",
                   "altura",
                   "peso",
                   "hizodieta",
                   "edad",
                   "hobbies",
                   "fuma",
                   "dondehizodieta"],
                   :columns => [:id,
                   :nombre,
                   :apellido,
                   :sexo,
                   :email,
                   :telefono,
                   :altura,
                   :peso,
                   :hizodieta,
                   :edad,
                   :hobbies,
                   :fuma,
                   :dondehizodieta],
                   :cell_format => {:color => :blue},
                   :header_format => {:weight => :bold, :color => :red},
                   :horizontal_align => :center),
                   :content_type => 'application/vnd.ms-excel',
                   :filename => 'lista.xls'
                 }
    end
  end
  
  def ver
    @usuario = Usuario.find_by_id(params[:id])
  end
  
end
