class ComputestsController < InheritedResources::Base
  #before_filter :authenticate_usuario!
  before_filter :find_pais
  
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
    if @computest.valid?
      if params[:peso]
        @computest.pais = params[:locale]

        bmi = ( params[:peso] ) / ( params[:altura] * params[:altura] )
  
        if bmi
          prime = ( bmi / 25 )
          @computest.imc = bmi.round
          prti = prime.to_s.match(/\d+/)
          ceros = prime.to_s.match(/\.(0+)/)

          if !ceros
            ceros = []
            ceros[1] = "0"
          end

          prcnt = prime.to_s.match(/\.(\d{1,2})/)
          if prti[0].to_i <= 0
            @computest.peso_ideal = "Estas #{(100)*(ceros[1].length) - (prcnt[1].to_i)}% debajo de tu peso ideal"
          else
            @computest.peso_ideal = "Estas #{prcnt[1].to_i + (100*(prti[0].to_i-1)) }% sobre tu peso ideal"
          end

          case
          when bmi < 18.5
            @computest.estado = "Bajo Peso"
          when bmi.between?(18.5,25)
            @computest.estado = "Normal"
          when bmi.between?(25,30)
            @computest.estado = "Con Sobrepeso"
          when bmi.between?(30,35)
            @computest.estado = "Obeso Clase I"
          when bmi.between?(35,40)
            @computest.estado = "Obeso Clase II"
          when bmi > 40
            @computest.estado = "Obeso Clase III"
          end
        end
      end
      create!(:notice => "Computest guardado correctamente.") 
    end
  end
end
