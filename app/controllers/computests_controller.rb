class ComputestsController < ApplicationController
  before_filter :authenticate_admin!, :except => [:show, :new, :create]
  before_filter :find_pais
  load_and_authorize_resource :except => [:show, :new, :create]
  
  def new
    @computest = Computest.new
  end
  
  def index
    @computests = Computest.where("pais = ?", params[:locale]).order("created_at DESC")
    respond_to do |format|
      format.html
      format.xls { send_data @computests.to_xls(:headers => ["Id",
                   "nombre",
                   "apellido",
                   "sexo",
                   "email",
                   "telefono",
                   "altura",
                   "peso",
                   "imc",
                   "estado",
                   "pais"],
                   :columns => [:id,
                   :nombre,
                   :apellido,
                   :sexo,
                   :email,
                   :telefono,
                   :altura,
                   :peso,
                   :imc,
                   :estado,
                   :pais],
                   :cell_format => {:color => :blue},
                   :header_format => {:weight => :bold, :color => :red},
                   :horizontal_align => :center),
                   :content_type => 'application/vnd.ms-excel',
                   :filename => 'computests.xls'
                 }
    end
  end
  
  def find_pais
    if params[:locale]
      @computests = Computest.where("pais = ?", params[:locale])
    end
  end
  
  def update
    update!(:notice => "Computest actualizado correctamente.")
  end
   
  def destroy
    destroy!(:notice => "Computest eliminado correctamente.")
  end
  
  def create
    @computest = Computest.new(params[:computest])
    
    respond_to do |format|
      if params[:locale]
        @computest.pais = params[:locale]
      end
      if @computest.save
        format.html { redirect_to(@computest, :notice => 'Computest guardado correctamente.') }
      else
        format.html { render :action => "new" }
      end
    end
  end
  
  def show
    @computest = Computest.find_by_id(params[:id])
    bmi = ( @computest.peso ) / ( @computest.altura * @computest.altura )

    if bmi
      prime = ( bmi / 25 )
      @imc = bmi.round
      prti = prime.to_s.match(/\d+/)
      ceros = prime.to_s.match(/\.(0+)/)

      if !ceros
        ceros = []
        ceros[1] = "0"
      end

      prcnt = prime.to_s.match(/\.(\d{1,2})/)
      if prti[0].to_i <= 0
        @peso_ideal = "Estas #{(100)*(ceros[1].length) - (prcnt[1].to_i)}% debajo de tu peso ideal"
      else
        @peso_ideal = "Estas #{prcnt[1].to_i + (100*(prti[0].to_i-1)) }% sobre tu peso ideal"
      end

      case
      when bmi < 18.5
        @estado = "Bajo Peso"
      when bmi.between?(18.5,25)
        @estado = "Normal"
      when bmi.between?(25,30)
        @estado = "Con Sobrepeso"
      when bmi.between?(30,35)
        @estado = "Obeso Clase I"
      when bmi.between?(35,40)
        @estado = "Obeso Clase II"
      when bmi > 40
        @estado = "Obeso Clase III"
      end
    end
    @computest.update_attributes(:imc => @imc, :peso_ideal => @peso_ideal, :estado => @estado)
  end
  
  
  def destroy
    @computest = Computest.find(params[:id])
    @computest.destroy

    respond_to do |format|
      format.html { redirect_to computests_path }
    end
  end
end
