class ComputestsController < ApplicationController
  before_filter :authenticate_usuario!
  def index
    weight = current_usuario.peso
    height = current_usuario.altura
    
    bmi = ( weight ) / ( height * height )
    
    if bmi
      prime = ( bmi / 25 )
      @bmi = bmi.round
      prti = prime.to_s.match(/\d+/)
      ceros = prime.to_s.match(/\.(0+)/)


      if !ceros
        ceros = []
        ceros[1] = "0"
      end


        prcnt = prime.to_s.match(/\.(\d{1,2})/)
      if prti[0].to_i <= 0
        @ideal_weight_percent = "Estas #{(100)*(ceros[1].length) - (prcnt[1].to_i)}% debajo de tu peso ideal"
      else
        @ideal_weight_percent = "Estas #{prcnt[1].to_i + (100*(prti[0].to_i-1)) }% sobre tu peso ideal"
      end

      case
      when bmi < 18.5
        @tipo = "Bajo Peso"
      when bmi.between?(18.5,25)
        @tipo = "Normal"
      when bmi.between?(25,30)
        @tipo = "Con Sobrepeso"
      when bmi.between?(30,35)
        @tipo = "Obeso Clase I"
      when bmi.between?(35,40)
        @tipo = "Obeso Clase II"
      when bmi > 40
        @tipo = "Obeso Clase III"
      end

    end
  end
end
